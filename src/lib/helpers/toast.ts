import { toast } from 'svelte-french-toast';

export const success = (msg: string) => {
	toast.success(msg, {
		position: 'bottom-right',
		className: 'mr-4 !bg-zinc-800 text-sm !text-gray-50'
	});
};

export const info = (msg: string) => {
	toast(msg, {
		position: 'bottom-right',
		className: 'mr-4 !bg-zinc-800 text-sm !text-gray-50'
	});
};
