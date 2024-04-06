<script lang="ts">
	import { toggleMode, mode } from 'mode-watcher';
	import { Moon, Sun, Menu } from 'lucide-svelte';

	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Sheet from '$lib/components/ui/sheet';

	export let section: string;

	const sections: Sections = {
		Dashboard: '/dashboard',
		Calendar: '/calendar',
		Toolbox: '/toolbox'
	};

	const redirectGithub = () => {
		window.open('https://github.com/gweebg/enemyless', '_blank');
	};
</script>

<nav
	class="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
>
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-14 items-center justify-between">
			<!-- Mobile -->
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<Sheet.Root>
					<Sheet.Trigger asChild let:builder>
						<Button builders={[builder]} variant="ghost" size="icon">
							<Menu strokeWidth={1.5} />
						</Button>
					</Sheet.Trigger>

					<Sheet.Content side="left">
						<Sheet.Header>
							<Sheet.Title>
								<div class="flex items-center justify-center space-x-2">
									<img class="h-8 w-auto" src="/logo.svg" alt="Your Company" />
									<span class="font-bold sm:inline-block">enemyless</span>
								</div>
							</Sheet.Title>

							<Sheet.Description>Navigate through the different tools.</Sheet.Description>
						</Sheet.Header>

						<div class="flex flex-col gap-2 py-4">
							{#each Object.keys(sections) as s}
								{#if section === s}
									<a
										href={sections[s]}
										class="text-foreground hover:text-foreground/80 px-3 py-2 transition-colors"
										aria-current="page">{s}</a
									>
								{:else}
									<a
										href={sections[s]}
										class="text-foreground/60 hover:text-foreground/80 px-3 py-2 transition-colors"
										>{s}</a
									>
								{/if}
							{/each}
						</div>
					</Sheet.Content>
				</Sheet.Root>
			</div>

			<!-- Desktop Left -->
			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<!-- Logo -->

				<!-- Items -->
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4 text-sm">
						{#each Object.keys(sections) as s}
							{#if section === s}
								<a
									href={sections[s]}
									class="text-foreground hover:text-foreground/80 px-3 py-2 transition-colors"
									aria-current="page">{s}</a
								>
							{:else}
								<a
									href={sections[s]}
									class="text-foreground/60 hover:text-foreground/80 px-3 py-2 transition-colors"
									>{s}</a
								>
							{/if}
						{/each}
					</div>
				</div>
			</div>

			<!-- Desktop Right -->
			<div
				class="absolute inset-y-0 right-0 flex items-center space-x-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<Button on:click={toggleMode} variant="ghost" size="icon" builders={[builder]}>
							<Sun
								strokeWidth={1.5}
								class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
							/>
							<Moon
								strokeWidth={1.5}
								class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
							/>
							<span class="sr-only">Toggle theme</span>
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						{#if $mode === 'light'}
							<p>Toggle dark mode</p>
						{:else}
							<p>Toggle light mode</p>
						{/if}
					</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<Button on:click={redirectGithub} variant="ghost" size="icon" builders={[builder]}>
							<Sun strokeWidth={1.5} class="h-[1.2rem] w-[1.2rem]" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Github</p>
					</Tooltip.Content>
				</Tooltip.Root>

				<Button variant="outline">
					<p class="text-foreground hover:text-foreground/80 transition-colors">Log Out</p>
				</Button>
			</div>
		</div>
	</div>
</nav>
