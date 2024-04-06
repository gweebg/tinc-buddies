<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import BotCard from '$lib/components/bot/BotCard.svelte';

	const bot: BotData = {
		id: 'aa1dfad1',
		name: 'Money Maker',
		description: 'This bot is named money maker because it does make money!',
		state: true,
		owner: 'guilherme',
		updated_at: '30 Jun 2021 at 20:00:00 PST'
	};
</script>

<div class="relative my-4 flex flex-1 flex-col gap-4 pb-4">
	<Navbar section="Dashboard" />

	<div class="container">
		<header class="mb-2 flex flex-row items-end justify-between">
			<span>
				<h1 class="scroll-m-20 text-4xl font-bold tracking-tight">My Bots</h1>
				<p class="text-muted-foreground text-balance text-lg">
					See and configure your bots in this page!
				</p>
			</span>
		</header>

		<section class="flex flex-col gap-3">
			<BotCard {bot} />
		</section>
	</div>
</div>
