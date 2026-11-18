<template>
	<main id="main-content" class="p-5">
		<Calculator heading-tag="h1" />
		<section class="tech-panel mt-5 p-6">
			<h2 class="text-2xl font-bold">iPhone repair prices in Clayton</h2>
			<p class="tech-muted mt-4">
				These estimates are in Australian dollars. We confirm the final quote and parts
				availability before your repair.
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
								<RouterLink v-if="item.path" :to="item.path" class="text-blue-300 underline">{{
									item.label
								}}</RouterLink>
								<span v-else>{{ item.label }}</span>
							</th>
							<td class="py-3">{{ item.price }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="tech-muted text-sm mt-4">
				Glass-only back repairs are available for iPhone 14, 14 Plus and the 15 series.
				Other listed models may need a housing replacement. Contact us for a quote if
				your repair is not available in the calculator.
			</p>
			<p class="tech-soft text-sm mt-4">
				Extra damage or a different model may change your quote. The calculator can
				estimate multiple repairs together.
			</p>
		</section>
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
import { getRepairPriceRange, REPAIR_SERVICE } from '@/utils/pricing.js'
import { services } from '@/data/services.js'
function formatRange(range) {
	if (!range) return 'Contact for a quote'
	return range.min === range.max ? `$${range.min}` : `$${range.min}–$${range.max}`
}
// Derive every row from supported models, including both quality options.
const estimates = [...services, { key: REPAIR_SERVICE.HOUSING, label: 'iPhone housing replacement' }].map((service) => {
	const budget = formatRange(getRepairPriceRange(service.key))
	const premium = formatRange(getRepairPriceRange(service.key, true))
	return {
		label: service.label,
		path: service.path,
		price: budget === premium ? budget : `${budget} budget / ${premium} premium`,
	}
})
</script>
