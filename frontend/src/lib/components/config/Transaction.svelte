<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { Clock, CircleDot, ArrowLeftRight } from 'lucide-svelte';

	export let tx: TransactionSchema;

	const type: string = tx.type.toUpperCase();
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between space-x-2 p-2">
		<Badge class="p-2">{type}</Badge>
		<span class="flex flex-row gap-2 pb-1">
			<div class="flex flex-col">
				<span class="flex flex-row gap-2">
					{#if type === 'BUY'}
						<p>{tx.inputAmount} USD</p>
						<ArrowLeftRight />
						<p>{tx.outputAmount} BTC</p>
					{/if}
					{#if type === 'SELL'}
						<p>{tx.inputAmount} BTC</p>
						<ArrowLeftRight />
						<p>{tx.outputAmount} USD</p>
					{/if}
				</span>
				<span class="text-muted-foreground flex justify-center text-xs"> {tx.date} </span>
			</div>
		</span>
		<span class="text-muted-foreground flex flex-row gap-1 pb-1 text-xs">
			{#if tx.status === 'pending'}
				<Clock size={16} />
				PENDING
			{:else}
				<CircleDot size={16} />
				COMPLETED
			{/if}
		</span>
	</Card.Header>
</Card.Root>
