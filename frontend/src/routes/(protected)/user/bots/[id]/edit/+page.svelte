<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toTitle } from '$lib/utils/text';
	import { ChevronLeft, Plus, Save, Trash } from 'lucide-svelte';
	import type { PageData } from '../$types';

	export let data: PageData;

	const { config } = data;
	let changableConfig = config;

	let possibleConfigAdd: string[] = [
		'maxTransactionAmount',
		'minTransactionAmount',
		'maxNumberOfTransactions',
		'minTransactionRisk',
		'maxTransactionRisk',
		'lookAheadHours'
	].filter((key) => !Object.keys(data.config).includes(key));

	let newAttributes: { [key in (typeof possibleConfigAdd)[number]]: string }[] = [];

	const removeAttribute = (key: string) => {
		possibleConfigAdd.push(key);
		possibleConfigAdd.sort();
		if (newAttributes.find((attribute) => Object.keys(attribute).includes(key))) {
			newAttributes = newAttributes.filter((attribute) => !Object.keys(attribute).includes(key));
		} else {
			changableConfig = Object.fromEntries(
				Object.entries(changableConfig).filter(([k, _]) => k !== key)
			) as typeof changableConfig;
		}
	};

	const addAttribute = (key: string) => {
		newAttributes.push({ key: key });
		possibleConfigAdd = possibleConfigAdd.filter((k) => k !== key);
		possibleConfigAdd.sort();
	};

	const back = () => {
		history.back();
	};

	const filterFields = ['id', 'activated', 'created_at', 'budget', 'updated_at'];
	$: filteredConfig = Object.entries(changableConfig).filter(
		([key, _]) => !filterFields.includes(key)
	);
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
							<Breadcrumb.Page>"{config.name}"</Breadcrumb.Page>
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
							<div class="flex space-x-2">
								<Input type="text" id={key} bind:value={changableConfig[key]} />
								<Button size="icon" on:click={() => removeAttribute(key)}
									><Trash size={16} /></Button
								>
							</div>
						</div>
					</div>
				{/each}

				{#each newAttributes as attribute}
					{#each Object.entries(attribute) as [key, value]}
						<div class="mb-2 flex flex-row gap-2">
							<div class="flex w-full max-w-sm flex-col gap-1.5">
								{key}
								<Label for={key}>
									<select class="flex w-full" bind:value={key}>
										<option selected value={key}>{key}</option>
										{#each possibleConfigAdd as key}
											<option value={key}>{toTitle(key)}</option>
										{/each}
									</select>
								</Label>
								<div class="flex space-x-2">
									<Input type="text" id={key} {value} />
									<Button size="icon" on:click={() => removeAttribute(key)}
										><Trash size={16} /></Button
									>
								</div>
							</div>
						</div>
					{/each}
				{/each}

				{#if possibleConfigAdd.length > 0}
					<Button class="w-full" on:click={() => addAttribute(possibleConfigAdd[0])}
						><Plus /></Button
					>
				{/if}
			</Card.Content>
		</Card.Root>
		<Button class="fixed bottom-2 right-2" size="icon"><Save size={24} /></Button>
	</div>
</div>
