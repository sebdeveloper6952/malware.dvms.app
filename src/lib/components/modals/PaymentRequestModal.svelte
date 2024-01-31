<script lang="ts">
	import Icon from '@iconify/svelte';
	import BaseModal from './BaseModal.svelte';
	import TextButton from '../buttons/TextButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import QrCode from '../QrCode.svelte';
	import { sendPayment } from '@lib/webln/webln';
	import { info } from '@lib/helpers/toast';

	export let show = false;
	export let pr = '';
	export let msat = 0;

	let paymentInProgress = false;

	const dispatch = createEventDispatcher();

	const onSubmit = async () => {
		paymentInProgress = true;
		const paid = await sendPayment(pr);
		paymentInProgress = false;
		if (paid) dispatch('paid');
	};
</script>

<BaseModal {show}>
	<div class="px-4 py-4">
		<div class="px-16">
			<div class="w-full flex justify-center">
				<Icon icon="pixelarticons:bitcoin" width="48" height="48" />
			</div>
			<p class="mt-4 text-2xl font-bold">Pay {msat / 1000} sats</p>
			<div class="mt-4 w-full flex justify-center">
				<QrCode data={pr} />
			</div>
			<div class="w-full mt-2 flex justify-center gap-1 text-gray-500">
				<p class="text-xs">{pr.substring(0, 12)}...</p>
				<button
					on:click={() => {
						navigator.clipboard.writeText(pr);
						info('copied to clipboard');
					}}><Icon icon="pixelarticons:copy" width="16" height="16" /></button
				>
			</div>
		</div>
		<div class="mt-4 w-full flex justify-end">
			<TextButton
				on:click={() => {
					dispatch('close');
				}}>Close</TextButton
			>
			<TextButton on:click={onSubmit}
				>{paymentInProgress ? 'Sending payment...' : 'Pay with browser extension'}</TextButton
			>
		</div>
	</div>
</BaseModal>
