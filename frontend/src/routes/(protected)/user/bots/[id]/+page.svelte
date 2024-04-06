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
		Pause,
		Pencil,
		PiggyBank,
		Play,
		Trash
	} from 'lucide-svelte';

	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import { toTitle } from '$lib/utils/text';
	import type { CarouselOptions } from '$lib/components/ui/carousel/context';

	export let data: PageData;

	const { config } = data;

	const filterFields = ['id', 'activated', 'created_at', 'updated_at'];
	const filteredConfig = Object.entries(config).filter(([key, _]) => !filterFields.includes(key));

	const back = () => {
		goto('/user/bots');
	};

	const carouselOptions: CarouselOptions = {
		loop: true
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
							<Breadcrumb.Link href="/user">User</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Link href="/user/bots">Bots</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Page>{config.name}</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
		</div>
	</nav>

	<div class="container flex flex-col gap-4">
		<div class="flex flex-row gap-2">
			{#if config.activated === true}
				<Button class="flex-1 gap-2" size="sm" disabled>
					<Trash strokeWidth={1.5} size={20} /> Delete
				</Button>
				<Button class="flex-1 gap-2" size="sm">
					<Pause strokeWidth={1.5} size={20} /> Stop
				</Button>
				<Button class="flex-1 gap-2" size="sm" disabled>
					<Play strokeWidth={1.5} size={20} /> Start
				</Button>
			{:else}
				<Button class="flex-1 gap-2" size="sm">
					<Trash strokeWidth={1.5} size={20} /> Delete
				</Button>
				<Button class="flex-1 gap-2" size="sm" disabled>
					<Pause strokeWidth={1.5} size={20} /> Stop
				</Button>
				<Button class="flex-1 gap-2" size="sm">
					<Play strokeWidth={1.5} size={20} /> Start
				</Button>
			{/if}
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
									<div class="text-2xl font-bold">$45,231.89</div>
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
									<div class="text-2xl font-bold">452</div>
									<p class="text-muted-foreground text-xs">+6.1% from last month</p>
								</Card.Content>
							</Card.Root>
						</Carousel.Item>
					</Carousel.Content>
					<Carousel.Previous />
					<Carousel.Next />
				</Carousel.Root>
			</Card.Content>
		</Card.Root>

		<Card.Root class="w-full">
			<Card.Header>
				<div class="flex flex-row justify-between">
					<h1 class="scroll-m-20 text-2xl font-bold tracking-tight">Configuration</h1>
					<Button class="gap-2" size="sm">
						<Pencil strokeWidth={1.5} size={20} /> Edit
					</Button>
				</div>
			</Card.Header>
			<Card.Content>
				{#each filteredConfig as [key, value]}
					<div class="mb-2 flex flex-row gap-2">
						<div class="flex w-full max-w-sm flex-col gap-1.5">
							<Label for={key}>
								{toTitle(key)}:
							</Label>
							<Input type="email" id={key} {value} disabled />
						</div>
					</div>
				{/each}
			</Card.Content>
		</Card.Root>

		<Card.Root class="w-full">
			<Card.Header>
				<h1 class="scroll-m-20 text-2xl font-bold tracking-tight">Transaction History</h1>
			</Card.Header>
			<Card.Content class="flex flex-col gap-2 ">
				<Card.Root>
					<Card.Header class="flex flex-row items-center justify-between space-x-2 p-2">
						<div class="flex flex-row gap-2">
							<PiggyBank class="h-6 w-6" strokeWidth={1.5} />
							<Card.Title class="text-md">Traded for 452 USD</Card.Title>
						</div>
						<span class="text-muted-foreground pb-1 text-xs"> 2024 April 6, 14:34 </span>
					</Card.Header>
				</Card.Root>

				<Card.Root>
					<Card.Header class="flex flex-row items-center justify-between p-2">
						<div class="flex flex-row gap-2">
							<Handshake class="h-6 w-6" strokeWidth={1.5} />
							<Card.Title class="text-md">Sold 0.001 BTC</Card.Title>
						</div>
						<span class="text-muted-foreground pb-1 text-xs"> 2024 April 6, 14:34 </span>
					</Card.Header>
				</Card.Root>
			</Card.Content>
		</Card.Root>
	</div>
</div>
