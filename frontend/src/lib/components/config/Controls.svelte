<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Pause, Play, Trash } from 'lucide-svelte';

	export let id: number;
	export let status: boolean;

	const handleDelete = async () => {
		let response;
		try {
			response = await fetch('/api/delete', {
				method: 'POST',
				body: JSON.stringify({ id: id })
			});

			if (!response.ok) {
				console.error(response);
				return;
			}
		} catch (err) {
			console.error(response);
			return;
		} finally {
			location.href = '/user/bots';
		}
	};

	const handleStop = async () => {
		let response;
		try {
			response = await fetch('/api/stop', {
				method: 'POST',
				body: JSON.stringify({ id: id })
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
				body: JSON.stringify({ id: id })
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

<!-- Delete Form -->
<form on:submit={handleDelete} class="flex-1">
	<Button class="w-full gap-2" type="submit" size="sm" disabled={status === true}>
		<Trash strokeWidth={1.5} size={20} /> Delete
	</Button>
</form>

<!-- Stop Form -->
<form on:submit={handleStop} class="flex-1">
	<Button class="w-full gap-2" type="submit" size="sm" disabled={status !== true}>
		<Pause strokeWidth={1.5} size={20} /> Stop
	</Button>
</form>

<!-- Start Form -->
<form on:submit={handleStart} class="flex-1">
	<Button class="w-full gap-2" type="submit" size="sm" disabled={status === true}>
		<Play strokeWidth={1.5} size={20} /> Start
	</Button>
</form>
