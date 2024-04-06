<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { createConfigSchema, type ConfigFormSchema } from '$lib/schemas/create_config';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Textarea from '../ui/textarea/textarea.svelte';

	export let data: SuperValidated<Infer<ConfigFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(createConfigSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} class="mb-2" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} class="mb-2" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="budget">
		<Form.Control let:attrs>
			<Form.Label>Budget</Form.Label>
			<Input {...attrs} bind:value={$formData.budget} class="mb-2" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<div class="flex flex-row justify-between">
		<Form.Field {form} name="minTransactionAmount" class="mr-2">
			<Form.Control let:attrs>
				<Form.Label>Min. Transaction Amount</Form.Label>
				<Input {...attrs} bind:value={$formData.minTransactionAmount} class="mb-2" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="maxTransactionAmount">
			<Form.Control let:attrs>
				<Form.Label>Max. Transaction Amount</Form.Label>
				<Input {...attrs} bind:value={$formData.maxTransactionAmount} class="mb-2" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<div class="flex flex-row justify-between">
		<Form.Field {form} name="minTransactionRisc" class="mr-2">
			<Form.Control let:attrs>
				<Form.Label>Min. Transaction Risc</Form.Label>
				<Input {...attrs} bind:value={$formData.minTransactionRisc} class="mb-2" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="maxTransactionRisc">
			<Form.Control let:attrs>
				<Form.Label>Max. Transaction Risc</Form.Label>
				<Input {...attrs} bind:value={$formData.maxTransactionRisc} class="mb-2" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<Form.Field {form} name="maxNumberOfTransactions">
		<Form.Control let:attrs>
			<Form.Label>Max. Number of Transaction</Form.Label>
			<Input {...attrs} bind:value={$formData.maxNumberOfTransactions} class="mb-2" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="lookaheadHours">
		<Form.Control let:attrs>
			<Form.Label>Lookahead Hours</Form.Label>
			<Input {...attrs} bind:value={$formData.lookaheadHours} class="mb-2" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="mt-2 w-full">Create</Form.Button>
</form>
