<template>
	<nav
		v-if="page.path !== '/' && !page.noindex"
		class="px-5 pt-3 text-sm tech-soft"
		aria-label="Breadcrumb"
	>
		<RouterLink to="/" class="underline">Home</RouterLink>
		<span aria-hidden="true"> / </span>
		<span aria-current="page">{{ page.label }}</span>
	</nav>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { pageForPath } from '@/utils/seo.js'
const route = useRoute()
const page = computed(() => pageForPath(route.path))
</script>
