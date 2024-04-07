<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';

	export let data: PageData;

	const { botData } = data;

	const formatTitle = (key: string) => {
		if (key === 'price') {
			return 'BTC Price';
		}
		return key[0].toUpperCase() + key.slice(1);
	};
</script>

<div class="relative my-4 flex flex-1 flex-col gap-4 pb-4">
	<Navbar section="Home" />

	<div class="container">
		<header class="mb-4 flex flex-row items-center justify-between">
			<div>
				<h1 class="scroll-m-20 text-4xl font-bold tracking-tight">Home</h1>
				<p class="text-muted-foreground text-balance text-lg">
					Welcome to Tinc Buddy, your personal assistant for managing your tinc network!
				</p>
			</div>
		</header>
	</div>
	<div class="container flex flex-col gap-4">
		{#each Object.entries(botData).reverse() as [key, value]}
			<Card.Root class="w-full">
				<Card.Header>
					<h1 class="scroll-m-20 text-2xl font-bold tracking-tight">
						{formatTitle(key)}
					</h1>
				</Card.Header>
				<Card.Content class="w-full space-y-2">{value}</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>
