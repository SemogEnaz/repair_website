<template>
	<section class="tech-panel my-5 p-6" aria-labelledby="services-heading">
		<p class="tech-eyebrow">Choose your repair</p>
		<h2 id="services-heading" class="text-2xl sm:text-3xl font-bold mt-2">
			iPhone repair services in Clayton
		</h2>
		<p class="tech-muted mt-3">
			Explore the repair you need, check an estimate and arrange a time to visit.
		</p>
		<div class="grid sm:grid-cols-2 gap-3 mt-5">
			<RouterLink
				v-for="service in services"
				:key="service.path"
				:to="service.path"
				class="tech-card p-5 block hover:border-blue-400"
			>
				<h3 class="text-lg font-bold text-blue-300">{{ service.label }}</h3>
				<p class="tech-muted mt-2 text-sm leading-relaxed">{{ service.summary }}</p>
				<span class="inline-block mt-3 text-sm underline"
					>Repair details &amp; estimates →</span
				>
			</RouterLink>
		</div>
		<p class="tech-muted mt-5">
			Our calculator lists iPhone 11, 12, 13, 14 and 15 models, including available Mini,
			Plus, Pro and Pro Max variants. For another model, contact us to check parts and repair
			availability.
		</p>
		<RouterLink to="/repair-prices" class="inline-block text-blue-300 underline mt-3"
			>Compare iPhone repair prices</RouterLink
		>
	</section>
</template>
<script setup>
import { services } from '@/data/services.js'
</script>
