<template>
	<main id="main-content" class="p-5">
		<section class="tech-panel p-6 sm:p-8">
			<p class="tech-eyebrow">iPhone Repair Clayton</p>
			<h1 class="text-3xl sm:text-4xl font-bold mt-2 tracking-tight">
				{{ service.heading }}
			</h1>
			<p class="tech-muted mt-4 leading-relaxed">{{ service.intro }}</p>
			<div class="flex flex-wrap gap-3 mt-6">
				<RouterLink to="/repair-prices#quote" class="tech-button px-5 py-3"
					>Get a repair estimate</RouterLink
				>
				<a
					:href="`tel:${business.phone}`"
					class="tech-button secondary px-5 py-3"
					@click="trackContact('phone')"
					>Call {{ business.displayPhone }}</a
				>
			</div>
		</section>
		<section
			v-for="section in service.sections"
			:key="section.heading"
			class="tech-card p-6 mt-4"
		>
			<h2 class="text-xl font-bold">{{ section.heading }}</h2>
			<p class="tech-muted mt-3 leading-relaxed">{{ section.text }}</p>
		</section>
		<section class="tech-panel p-6 mt-5">
			<h2 class="text-2xl font-bold">Common questions</h2>
			<div v-for="faq in service.faqs" :key="faq.question" class="mt-5">
				<h3 class="font-bold">{{ faq.question }}</h3>
				<p class="tech-muted mt-2 leading-relaxed">{{ faq.answer }}</p>
			</div>
			<RouterLink
				v-if="service.key === 'battery'"
				to="/battery"
				class="inline-block text-blue-300 underline mt-5"
				>Read our iPhone battery health guide</RouterLink
			>
		</section>
		<BusinessDetails />
		<nav class="tech-card p-6" aria-label="Other repair services">
			<h2 class="text-xl font-bold">Other iPhone repairs</h2>
			<ul class="mt-3 space-y-3">
				<li
					v-for="other in services.filter((item) => item.path !== service.path)"
					:key="other.path"
				>
					<RouterLink :to="other.path" class="text-blue-300 underline"
						>{{ other.label }} in Clayton</RouterLink
					>
				</li>
			</ul>
		</nav>
	</main>
</template>
<script setup>
import { business } from '@/data/business.js'
import { services } from '@/data/services.js'
import { trackContact } from '@/utils/analytics.js'
import BusinessDetails from '@/components/BusinessDetails.vue'
defineProps({ service: { type: Object, required: true } })
</script>
