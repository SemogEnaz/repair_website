<template>
	<main id="main-content" class="p-5">
		<section class="tech-panel p-6">
			<p class="tech-eyebrow">Plan your repair</p>
			<h1 class="text-3xl sm:text-4xl font-bold mt-2">iPhone repair prices in Clayton</h1>
			<p class="tech-muted mt-4">
				Select your iPhone model, the services you need and your screen parts preference.
				These are estimates in Australian dollars; we confirm the final quote and parts
				availability before repair.
			</p>
			<div class="overflow-x-auto mt-5">
				<table class="w-full text-left text-sm">
					<caption class="text-left tech-soft pb-3">
						Current single-repair calculator estimates for listed models
					</caption>
					<thead>
						<tr class="border-b border-slate-600">
							<th scope="col" class="py-3 pr-4">Repair</th>
							<th scope="col" class="py-3">Estimate (AUD)</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="item in estimates"
							:key="item.label"
							class="border-b border-slate-700"
						>
							<th scope="row" class="py-3 pr-4 font-normal">
								<RouterLink :to="item.path" class="text-blue-300 underline">{{
									item.label
								}}</RouterLink>
							</th>
							<td class="py-3">{{ item.price }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="tech-soft text-sm mt-4">
				Extra damage or a different model may require a different quote. Select multiple
				services below to see current combined estimates.
			</p>
		</section>
		<Calculator />
		<section class="tech-card p-6 mt-5">
			<h2 class="text-xl font-bold">Which iPhone models can I select?</h2>
			<p class="tech-muted mt-3">
				The calculator includes iPhone 11, 12, 13, 14 and 15, with their available Mini,
				Plus, Pro and Pro Max variants. If your model is not listed, contact us to check
				whether we can source the part and quote the repair.
			</p>
			<RouterLink to="/contact" class="inline-block text-blue-300 underline mt-3"
				>Ask about your iPhone model</RouterLink
			>
		</section>
	</main>
</template>
<script setup>
import Calculator from '@/components/HomePage/Calculator.vue'
import { calculateRepairPrice } from '@/utils/pricing.js'
import { services } from '@/data/services.js'
function estimate(service, isPremium = false) {
	return calculateRepairPrice({
		model: '11',
		services: [service],
		selectedServices: [true],
		isPremium,
	})
}
// Reuse calculator prices so the visible table stays in sync.
const estimates = services.map((service) => ({
	label: service.label,
	path: service.path,
	price:
		service.key === 'screen'
			? `$${estimate(service.key)} budget / $${estimate(service.key, true)} premium`
			: `$${estimate(service.key)}`,
}))
</script>
