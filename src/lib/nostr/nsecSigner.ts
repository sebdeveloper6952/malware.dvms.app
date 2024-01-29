import NDK, { NDKPrivateKeySigner, NDKNip07Signer } from '@nostr-dev-kit/ndk';
import { get, writable } from 'svelte/store';
import type { NDKUser } from '@nostr-dev-kit/ndk';
import { nip19 } from 'nostr-tools';
import { persisted } from 'svelte-persisted-store';
import { ndk } from './ndk';
import { buf2hex } from '@lib/helpers/buf2hex';

const pkStorage = persisted('pk', '');
const skStorage = persisted('sk', '');
export const userStore = writable<NDKUser | null>();

export const setSkSigner = async (sk: string) => {
	let p: string = sk;

	try {
		let { type, data } = nip19.decode(sk);
		if (type === 'nsec') {
			p = buf2hex(data as Uint8Array);
		}
	} catch (e) {}

	const signer = new NDKPrivateKeySigner(p);
	ndk.signer = signer;

	const user = await signer.blockUntilReady();
	ndk.activeUser = user;

	userStore.set(user);
	skStorage.set(p);
};

export const setNip07Signer = async () => {
	const signer = new NDKNip07Signer();
	const user = await signer.blockUntilReady();

	ndk.signer = signer;
	user.ndk = ndk;

	await user.fetchProfile();

	userStore.set(user);
	pkStorage.set(user.pubkey);
};

export const logout = () => {
	ndk.signer = undefined;
	ndk.activeUser = undefined;

	userStore.set(null);
	pkStorage.set('');
	skStorage.set('');
};
