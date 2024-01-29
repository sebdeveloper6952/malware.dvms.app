<script lang="ts">
	export let expanded = false;
	export let disabled = false;
</script>

<button
	on:click
	{disabled}
	class:w-full={expanded}
	class:w-fit={!expanded}
	class="px-6 py-1 rounded-lg text-orange-700 font-bold hover:bg-orange-600/10 active:bg-orange-700/10 disabled:cursor-not-allowed disabled:hover:bg-orange-700/10"
>
	<slot />
</button>
