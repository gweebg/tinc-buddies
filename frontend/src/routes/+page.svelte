<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="relative my-4 flex flex-1 flex-col gap-4 pb-4">
	<Navbar section="Home" />

	<div class="container">
		<header class="mb-4 flex flex-row items-center justify-between">
			<div>
				<h1 class="scroll-m-20 text-4xl font-bold tracking-tight">Home</h1>
				<p class="text-muted-foreground text-balance text-lg">
					Welcome to Tinc Buddy, your personal assistant for managing your tinc network!
				</p>
			</div>
		</header>
	</div>
</div>
