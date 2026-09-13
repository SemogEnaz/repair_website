<template>
	<section class="tech-panel p-6 my-5 space-y-3" aria-labelledby="business-location-heading">
		<p class="tech-eyebrow">Local repairs by appointment</p>
		<h2 id="business-location-heading" class="text-2xl font-bold">
			Visit iPhone Repair Clayton
		</h2>
		<address class="tech-muted not-italic">{{ business.address }}</address>
		<p class="tech-muted">{{ business.hours }}</p>
		<p class="tech-soft">{{ business.visitNote }}</p>
		<div class="flex flex-wrap gap-3 pt-2">
			<a
				:href="business.directions"
				target="_blank"
				rel="noopener noreferrer"
				class="tech-button px-4 py-3"
				@click="trackContact('directions')"
				>Get directions</a
			>
			<a
				:href="business.googleProfile"
				target="_blank"
				rel="noopener noreferrer"
				class="tech-button secondary px-4 py-3"
				>Read our Google reviews</a
			>
		</div>
	</section>
</template>
<script setup>
import { business } from '@/data/business.js'
import { trackContact } from '@/utils/analytics.js'
</script>
