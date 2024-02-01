<script lang="ts">
	import Icon from '@iconify/svelte';

	let followMode = true;
</script>

<div>
	<p>Filter mode:</p>
	<div class="w-fit flex">
		<button
			on:click={() => {
				followMode = true;
			}}
			class="px-2 py-1 flex items-center gap-1 rounded-l border border-orange-500"
			class:bg-orange-500={followMode}
			class:text-zinc-800={followMode}
		>
			<Icon icon="pixelarticons:human-handsup" width="24" height="24" />
			<p>Follows</p>
		</button>
		<button
			on:click={() => {
				followMode = false;
			}}
			class="px-2 py-1 flex items-center gap-1 rounded-r border border-orange-500"
			class:bg-orange-500={!followMode}
			class:text-zinc-800={!followMode}
		>
			<p>Global</p>
			<Icon icon="pixelarticons:eye" width="24" height="24" />
		</button>
	</div>
</div>
