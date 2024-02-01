<script setup lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let show = false;
	export let cancellable = false;

	const dispatch = createEventDispatcher();

	const onModalBackgroundClick = (event: MouseEvent) => {
		if (cancellable && event.target === event.currentTarget) {
			dispatch('close');
		}
	};
</script>

{#if show}
	<button
		on:click={onModalBackgroundClick}
		class="w-screen h-screen bg-black/75 flex justify-center items-center absolute top-0 left-0 z-[99999999] hover:cursor-default"
	>
		<div class="w-full h-full md:w-fit md:h-fit bg-zinc-800 rounded-3xl relative">
			<slot />
		</div>
	</button>
{/if}
