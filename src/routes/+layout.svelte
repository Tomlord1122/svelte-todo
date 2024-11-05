<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Kaiti Challenge</title>
	<meta name="description" content="Writing todo app in sveltekit" />
	<meta name="keywords" content="sveltekit, todo app" />
</svelte:head>

{@render children()}
