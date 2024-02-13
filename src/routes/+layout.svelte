<script lang="ts">
	import type { LayoutData } from './$types';
	import { onMount, type ComponentType } from 'svelte';
	import { Fragment } from '@master/css.svelte';
	import Nav from '$lib/modules/Nav.svelte';
	import '@master/normal.css';
	import Footer from '$lib/modules/Footer.svelte';

	import type { CSSRuntimeProvider as CSSProviderType } from "@master/css.svelte";
 
    let CSSRuntimeProvider: ComponentType<CSSProviderType> = Fragment as any;

	onMount(async () => {
		CSSRuntimeProvider = (await import('@master/css.svelte')).CSSRuntimeProvider;
	});

	export let data: LayoutData;
</script>

<svelte:component this={CSSRuntimeProvider} config={import('../../master.css')}>
	<Nav user={data.locals.user} />
	<div class="app min-vh">
		<slot />
	</div>
	<Footer />
</svelte:component>
