<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ConfigCard from '$lib/components/config/ConfigCard.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Plus } from 'lucide-svelte';
	import type { PageData } from './$types';
	import ConfigCreateForm from '$lib/components/config/ConfigCreateForm.svelte';

	export let data: PageData;

	const { configs, form } = data;
</script>

<div class="relative my-4 flex flex-1 flex-col gap-4 pb-4">
	<Navbar section="Bots" balance={data.balance} />
	<div class="container">
		<header class="mb-4 flex flex-row items-center justify-between">
			<div>
				<h1 class="scroll-m-20 text-4xl font-bold tracking-tight">My Buddies</h1>
				<p class="text-muted-foreground text-balance text-lg">
					See and configure your Buddies in this page!
				</p>
			</div>
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants({ variant: 'default', size: 'icon' })}>
					<Plus />
				</Dialog.Trigger>
				<Dialog.Content class="sm:max-w-[425px]">
					<Dialog.Header>
						<Dialog.Title>Create Configuration</Dialog.Title>
						<Dialog.Description>
							Fill out the fields accordingly, be careful with the mandatory ones!
						</Dialog.Description>
					</Dialog.Header>
					<ConfigCreateForm data={form} />
				</Dialog.Content>
			</Dialog.Root>
		</header>

		<section class="flex flex-col gap-3">
			{#if configs.length !== 0}
				{#each configs as config}
					<ConfigCard {config} />
				{/each}
			{:else}
				<h1 class="scroll-m-20 pt-2 text-center text-3xl font-semibold tracking-tight">
					It looks like you don't have any bot created!
				</h1>
			{/if}
		</section>
	</div>
</div>
