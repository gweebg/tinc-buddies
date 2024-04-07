<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { Button } from '$lib/components/ui/button';
	import {
		ArrowLeftRight,
		ChevronLeft,
		DollarSign,
		Handshake,
		Pencil,
		PiggyBank,
		X,
		Save
	} from 'lucide-svelte';

	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import { toTitle } from '$lib/utils/text';
	import type { CarouselOptions } from '$lib/components/ui/carousel/context';
	import Transaction from '$lib/components/config/Transaction.svelte';
	import Controls from '$lib/components/config/Controls.svelte';

	export let data: PageData;

	const { config, transactions, stats } = data;

	let editedConfig = config;

	const filterFields = ['id', 'activated', 'created_at', 'acquired', 'budget', 'updated_at'];
	const filteredConfig = Object.entries(editedConfig).filter(
		([key, _]) => !filterFields.includes(key)
	);
	const originalFiltered = Object.entries(config).filter(([key, _]) => !filterFields.includes(key));

	const back = () => {
		goto('/user/bots');
	};

	let editMode = false;
	const edit = () => {
		editMode = !editMode;
	};

	const carouselOptions: CarouselOptions = {
		loop: true
	};

	const submit = async () => {
		let response;
		try {
			response = await fetch('/api/edit', {
				method: 'POST',
				body: JSON.stringify(editedConfig)
			});

			if (!response.ok) {
				console.error(response);
				return;
			}
		} catch (err) {
			console.error(response);
			return;
		} finally {
			location.reload();
		}
	};
</script>

<div class="relative my-4 flex flex-1 flex-col gap-4 pb-4">
	<nav class="bg-background/95 supports-[backdrop-filter]:bg-background/60 w-full backdrop-blur">
		<div class="mx-auto max-w-7xl px-2 sm:px-6">
			<div class="relative flex h-14 items-center gap-4">
				<Button size="icon" variant="ghost" on:click={back}>
					<ChevronLeft strokeWidth={1.5} />
				</Button>
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item>
							<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Link href="/user/bots">User</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Link href="/user/bots">Bots</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Page>"{config.name}"</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
		</div>
	</nav>

	<div class="container flex flex-col gap-4">
		<div class="flex flex-row gap-2">
			<Controls id={config.id} status={config.activated} />
		</div>

		<Card.Root class="w-full">
			<Card.Header>
				<h1 class="scroll-m-20 text-2xl font-bold tracking-tight">Statistics</h1>
			</Card.Header>
			<Card.Content class="w-full space-y-2">
				<Carousel.Root class="w-full" opts={carouselOptions}>
					<Carousel.Content>
						<Carousel.Item>
							<Card.Root>
								<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
									<Card.Title class="text-sm font-medium">Total Profit</Card.Title>
									<DollarSign class="text-muted-foreground h-4 w-4" />
								</Card.Header>
								<Card.Content>
									<div class="text-2xl font-bold">{stats.profit} USD</div>
									<p class="text-muted-foreground text-xs">+20.1% from last month</p>
								</Card.Content>
							</Card.Root>
						</Carousel.Item>
						<Carousel.Item>
							<Card.Root>
								<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
									<Card.Title class="text-sm font-medium">Number of Transactions</Card.Title>
									<ArrowLeftRight class="text-muted-foreground h-4 w-4" />
								</Card.Header>
								<Card.Content>
									<div class="text-2xl font-bold">{transactions.length}</div>
									<p class="text-muted-foreground text-xs">+0% from last month</p>
								</Card.Content>
							</Card.Root>
						</Carousel.Item>
						<Carousel.Item>
							<Card.Root>
								<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
									<Card.Title class="text-sm font-medium">Buys</Card.Title>
									<PiggyBank class="text-muted-foreground h-4 w-4" />
								</Card.Header>
								<Card.Content>
									<div class="text-2xl font-bold">{stats.totalBought}</div>
									<p class="text-muted-foreground text-xs">+0% from last month</p>
								</Card.Content>
							</Card.Root>
						</Carousel.Item>
						<Carousel.Item>
							<Card.Root>
								<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
									<Card.Title class="text-sm font-medium">Sales</Card.Title>
									<Handshake class="text-muted-foreground h-4 w-4" />
								</Card.Header>
								<Card.Content>
									<div class="text-2xl font-bold">{stats.totalSold}</div>
									<p class="text-muted-foreground text-xs">+0% from last month</p>
								</Card.Content>
							</Card.Root>
						</Carousel.Item>
					</Carousel.Content>
					<Carousel.Previous />
					<Carousel.Next />
				</Carousel.Root>
			</Card.Content>
		</Card.Root>

		<form action="?/edit" method="POST">
			<Card.Root class="w-full">
				<Card.Header>
					<div class="flex flex-row justify-between">
						<h1 class="scroll-m-20 text-2xl font-bold tracking-tight">Configuration</h1>

						<div>
							{#if editMode}
								<Button
									class="gap-2"
									size="sm"
									on:click={() => {
										editMode = false;
									}}
								>
									<X strokeWidth={1.5} size={20} />
								</Button>
							{/if}

							{#if !editMode}
								<Button class="gap-2" size="sm" on:click={edit}>
									<Pencil strokeWidth={1.5} size={20} /> Edit
								</Button>
							{:else}
								<Button class="gap-2" size="sm" on:click={submit}>
									<Save strokeWidth={1.5} size={20} /> Save
								</Button>
							{/if}
						</div>
					</div>
				</Card.Header>
				<Card.Content>
					{#if editMode}
						{#each filteredConfig as [key, value]}
							<div class="mb-2 flex flex-row gap-2">
								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for={key}>
										{toTitle(key)}:
									</Label>
									<Input class="flex w-full flex-1" id={key} bind:value={editedConfig[key]} />
								</div>
							</div>
						{/each}
					{:else}
						{#each originalFiltered as [key, value]}
							<div class="mb-2 flex flex-row gap-2">
								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for={key}>
										{toTitle(key)}:
									</Label>
									<Input class="flex w-full flex-1" id={key} {value} disabled />
								</div>
							</div>
						{/each}
					{/if}
				</Card.Content>
			</Card.Root>
		</form>

		<Card.Root class="w-full">
			<Card.Header>
				<h1 class="scroll-m-20 text-2xl font-bold tracking-tight">Transaction History</h1>
			</Card.Header>
			<Card.Content class="flex flex-col gap-2 ">
				{#if transactions.length === 0}
					<h2>No transactions have been made by this buddy.</h2>
				{/if}

				{#each transactions as transaction}
					<Transaction tx={transaction} />
				{/each}
			</Card.Content>
		</Card.Root>
	</div>
</div>
