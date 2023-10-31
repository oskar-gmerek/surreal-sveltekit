<script lang="ts">
	import type { CSSProvider as CSSProviderType } from '@master/css.svelte';
	import type { LayoutData } from './$types';
	import { onMount, type ComponentType } from 'svelte';
	import { Fragment } from '@master/css.svelte';
	import Nav from '$lib/modules/Nav.svelte';
	import '@master/normal.css';

	let CSSProvider: ComponentType<CSSProviderType> = Fragment as any;

	onMount(async () => {
		CSSProvider = (await import('@master/css.svelte')).CSSProvider;
	});

	export let data: LayoutData;
</script>

<svelte:component this={CSSProvider} config={import('../master.css')}>
	<Nav user={data.locals.user} />
	<div class="app">
		<slot />
	</div>
</svelte:component>
