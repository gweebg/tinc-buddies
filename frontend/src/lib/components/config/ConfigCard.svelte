<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { CircleDot } from 'lucide-svelte';

	export let config: ConfigSchema;

	const activeState = {
		message: 'ACTIVE',
		color: '#28a745'
	};

	const stoppedState = {
		message: 'STOPPED',
		color: '#f32013'
	};

	const handleStop = async () => {
		let response;
		try {
			response = await fetch('/api/stop', {
				method: 'POST',
				body: JSON.stringify({ id: config.id })
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

	const handleStart = async () => {
		let response;
		try {
			response = await fetch('/api/start', {
				method: 'POST',
				body: JSON.stringify({ id: config.id })
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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="hover:cursor-pointer"
	on:click={() => {
		goto(`/user/bots/${config.id}`);
	}}
>
	<Card.Root class="w-full">
		<Card.Header>
			<div class="flex flex-row items-center justify-between">
				<div class="space-y-1">
					<Card.Title>{config.name}</Card.Title>
					<Card.Description>{config.description}</Card.Description>
				</div>
				<div class="flex flex-row items-center gap-2">
					{#if config.activated}
						<span class="text-muted-foreground ml-4 text-balance text-sm tracking-tight"
							>{activeState.message}</span
						>
						<CircleDot fill={activeState.color} color={activeState.color} size={16} />
					{:else}
						<span class="text-muted-foreground ml-4 text-balance text-sm tracking-tight"
							>{stoppedState.message}</span
						>
						<CircleDot fill={stoppedState.color} color={stoppedState.color} size={16} />
					{/if}
				</div>
			</div>
		</Card.Header>
		<Card.Footer class="flex items-end justify-between">
			<p class="text-muted-foreground text-balance text-sm tracking-tight">
				Running since 30 Jun 2021 at 20:00:00 PST
				<!-- Last updated at {config.updated_at} -->
			</p>
			<span on:click|stopPropagation>
				{#if config.activated}
					<Button size="sm" on:click={handleStop}>Stop</Button>
				{:else}
					<Button size="sm" on:click={handleStart}>Start</Button>
				{/if}
			</span>
		</Card.Footer>
	</Card.Root>
</div>
