<!-- https://www.reddit.com/r/batteries/comments/10cxgbm/when_a_battery_starts_to_die_is_it_the_voltage_or/
First and foremost, batteries are an energy source. When operated within their listed limits, they will try to provide constant power required by the circuit they're connected to. This usually means that they're providing a fairly constant current based on what voltage they're presently at. As the load drains energy from the battery, the voltage will drop as the internal resistance increases with use, thus limiting current and heating up the battery. Most batteries have a critical point at which it can no longer safely provide that constant power, and that too will wane. This point marks what we consider "dead". For a car 12V lead-acid battery, it's at about 10V. For NiMH, that's 0.9V, and for lithium-ion batteries, that's usually at about 2.7V. Discharging past these voltages is generally not considered safe for the battery and can cause damage, moreover when you attempt to recharge them.
-->

<template>
	<section class="tech-panel hero-panel text-center px-4 py-8 sm:p-10 m-5">
		<p class="tech-eyebrow">When Battery Health is Below 80%</p>

		<h2 class="mt-2 text-2xl sm:text-4xl font-bold leading-tight tracking-tight">
			How does low battery health affect your iPhone?
		</h2>

		<p class="tech-soft mt-6 text-xs sm:text-sm flex flex-wrap justify-center items-center sm:gap-x-4 gap-x-2 gap-y-2">
			<Dot message="Random Shutdowns" :color_selection="3" />
			<Dot message="Throttled Performance" :color_selection="3" />
			<Dot message="Quick Depletion" :color_selection="3" />
		</p>

		<div class="mt-8 flex justify-center">
			<RouterLink to="/#quote" class="tech-button sm:px-8 px-5 py-3">
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
			For example, a battery with 80% health can hold approximately 80% of the charge it could
			when new.
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
			<li>Unexpected shutdowns during demanding tasks.</li>
			<li>Performance is lowered by iOS as per “Batterygate”.</li>
			<li>Reduced battery duration when in use.</li>
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
				<a href="https://support.apple.com/en-au/101575" target="_blank" class="underline whitespace-nowrap">https://support.apple.com/en-au/101575</a>
			</li>
			<li> Apple Support - About the Battery and Performance of iPhone 11 and Later:
				<a href="https://support.apple.com/en-au/106348" target="_blank" class="underline whitespace-nowrap">https://support.apple.com/en-au/106348</a>
			</li>
			<li>
				Apple Support - Understand Your iPhone Battery Usage and Health:
				<a href="https://support.apple.com/guide/iphone/understand-iphone-battery-usage-health--iphd453d043a/ios" target="_blank" class="underline whitespace-nowrap">Apple User Guide</a>
			</li>
		</ol>
	</section>

<section class="tech-panel p-8 mx-5 mb-5">
	<h3 class="text-xl sm:text-2xl font-bold tracking-tight">
		Why Replace Your Battery?
	</h3>

	<p class="mt-4">
		Battery replacement is one of the most cost-effective upgrades you can make to an iPhone.
		A new battery can improve daily usability, reduce power-related issues, and make the device
		more reliable for continued use or resale.
	</p>

	<h4 class="mt-6 font-semibold">
		A new battery can help to:
	</h4>

	<ol class="mt-1 pl-3 list-decimal list-inside space-y-0">
		<li>Restore battery life closer to the device's original performance.</li>
		<li>Reduce the likelihood of unexpected shutdowns.</li>
		<li>Improve responsiveness when performance management has been applied.</li>
		<li>Extend the useful life of the device for several more years.</li>
		<li>Increase the resale value and attractiveness of the phone to future buyers.</li>
	</ol>

	<p class="mt-6">
		For many iPhones, a battery replacement can provide a noticeably better user experience
		without the expense of purchasing a new device.
	</p>
</section>

</template>

<script setup>
import Dot from '@/components/Dot.vue';
</script>

<style scoped>

a {
	cursor: pointer;
}

</style>
