<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ConfigCard from '$lib/components/config/ConfigCard.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	const { configs } = data;
</script>

<div class="relative my-4 flex flex-1 flex-col gap-4 pb-4">
	<Navbar section="Dashboard" />
	<div class="container">
		<header class="mb-4 flex flex-row items-end justify-between">
			<div>
				<h1 class="scroll-m-20 text-4xl font-bold tracking-tight">My Bots</h1>
				<p class="text-muted-foreground text-balance text-lg">
					See and configure your bots in this page!
				</p>
			</div>
		</header>

		<section class="flex flex-col gap-3">
			{#each configs as config}
				<ConfigCard {config}/>
			{/each}
		</section>
	</div>
</div>
