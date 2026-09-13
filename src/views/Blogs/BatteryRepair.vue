<template>
<main id="main-content">
	<section class="tech-panel hero-panel text-center px-4 py-8 sm:p-10 m-5">
		<p class="tech-eyebrow">When Battery Health is Below 80%</p>

		<h1 class="mt-2 text-2xl sm:text-4xl font-bold leading-tight tracking-tight">
			How does low battery health affect your iPhone?
		</h1>

		<p class="tech-soft mt-6 text-xs sm:text-sm flex flex-wrap justify-center items-center sm:gap-x-4 gap-x-2 gap-y-2">
			<Dot message="Random Shutdowns" :color_selection="3" />
			<Dot message="Throttled Performance" :color_selection="3" />
			<Dot message="Quick Depletion" :color_selection="3" />
		</p>

		<div class="mt-8 flex justify-center">
			<RouterLink to="/iphone-battery-replacement-clayton" class="tech-button sm:px-8 px-5 py-3">
				Book a Battery Replacement Today
			</RouterLink>
		</div>
	</section>

	<section class="tech-panel p-8 mx-5 mb-5">
		<h3 class="text-xl sm:text-2xl font-bold tracking-tight">
			Understanding iPhone Battery Health
		</h3>

		<p class="mt-4">
			Battery Health indicates how much of the battery's original capacity it can still store.
		</p>

		<p class="mt-4">
			Battery degradation is a natural and irreversible process caused by chemical changes
			within the battery over time. As a battery ages, it loses both capacity and its ability
			to deliver power efficiently.
		</p>

		<h4 class="mt-6 font-semibold">
			A heavily degraded battery may result in:
		</h4>

		<ol class="mt-1 pl-3 list-decimal list-inside space-y-0">
			<li>Unexpected & random shutdowns</li>
			<li>Performance lowered by iOS as per “Batterygate”.</li>
			<li>Reduced battery duration.</li>
			<li>Increased heat generation due to higher internal resistance.</li>
			<li>Greater risk of complete battery failure.</li>
		</ol>

		<p class="mt-6">
			Lithium-ion batteries can also be damaged if they are discharged to extremely low
			voltages. In severe cases, this can make the battery difficult or impossible to recharge
			and may require replacement.
		</p>

		<h4 class="mt-8 font-semibold">References</h4>
		<ol class="mt-1 list-decimal pl-3 list-inside space-y-2 text-sm tech-soft">
			<li>Apple Support - iPhone Battery and Performance:
				<a href="https://support.apple.com/en-au/101575" target="_blank" class="underline break-all" rel="noopener noreferrer">https://support.apple.com/en-au/101575</a>
			</li>
			<li> Apple Support - About the Battery and Performance of iPhone 11 and Later:
				<a href="https://support.apple.com/en-au/106348" target="_blank" class="underline break-all" rel="noopener noreferrer">https://support.apple.com/en-au/106348</a>
			</li>
			<li>
				Apple Support - Understand Your iPhone Battery Usage and Health:
				<a href="https://support.apple.com/guide/iphone/understand-iphone-battery-usage-health--iphd453d043a/ios" target="_blank" class="underline break-all" rel="noopener noreferrer">Apple User Guide</a>
			</li>
		</ol>
	</section>

<section class="tech-panel p-8 mx-5 mb-5">
	<h3 class="text-xl sm:text-2xl font-bold tracking-tight">
		Why Replace Your Battery?
	</h3>

	<p class="mt-4">
		Battery replacement is one of the most cost-effective upgrades you can make to an iPhone.
		A new battery can improve daily usability, reduce power-related issues, and
		<span class="text-blue-300 italic">make the device more reliable for continued use or resale.</span>
	</p>

	<h4 class="mt-6 font-semibold">
		A new battery can help to:
	</h4>

	<ol class="mt-1 pl-3 list-decimal list-inside space-y-0">
		<li>Improve battery life when the old battery is worn.</li>
		<li>Reduce shutdowns caused by an ageing battery.</li>
		<li>Improve responsiveness by providing maximum power output</li>
		<li>Extend the useful life of a phone that is otherwise in good condition.</li>
		<li>Increase the resale value and attractiveness of the phone to future buyers.</li>
	</ol>

	<p class="mt-6">
		For many iPhones, a battery replacement can provide a noticeably better user experience
		without the expense of purchasing a new device.
	</p>

	<div class="mt-8 flex justify-center">
		<RouterLink to="/iphone-battery-replacement-clayton" class="tech-button sm:px-8 px-5 py-3">
			Book a Battery Replacement Today
		</RouterLink>
	</div>

</section>

</main>
</template>

<script setup>
import Dot from '@/components/Dot.vue';
</script>

<style scoped>

a {
	cursor: pointer;
}

</style>
