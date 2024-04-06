<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toTitle } from '$lib/utils/text';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button';
	import { ChevronLeft } from 'lucide-svelte';
	import type { PageData } from '../$types';
	export let data: PageData;

	const { config } = data;

	const back = () => {
		history.back();
	};

	const filterFields = ['id', 'activated', 'created_at', 'updated_at'];
	const filteredConfig = Object.entries(config).filter(([key, _]) => !filterFields.includes(key));
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
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Edit</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
		</div>
	</nav>

	<div class="container flex flex-col gap-4">
		<Card.Root class="w-full">
			<Card.Header>
				<div class="flex flex-row justify-between">
					<h1 class="scroll-m-20 text-2xl font-bold tracking-tight">Configuration</h1>
				</div>
			</Card.Header>
			<Card.Content>
				{#each filteredConfig as [key, value]}
					<div class="mb-2 flex flex-row gap-2">
						<div class="flex w-full max-w-sm flex-col gap-1.5">
							<Label for={key}>
								{toTitle(key)}:
							</Label>
							<Input type="text" id={key} {value} />
						</div>
					</div>
				{/each}
			</Card.Content>
		</Card.Root>
	</div>
</div>
