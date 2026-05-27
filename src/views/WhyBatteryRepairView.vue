<template>
	<section class="tech-panel hero-panel text-center px-4 py-8 sm:p-10 m-5">

	<p class="tech-eyebrow">Understanding iPhone Battery Health</p>

	<h2 class="mt-2 text-2xl sm:text-4xl font-bold leading-tight tracking-tight">
		Why Low Battery Health Slows iPhones Down
	</h2>

	<p class="tech-muted mt-6 max-w-3xl mx-auto leading-relaxed">
		Battery health is not just about how long your iPhone lasts on a charge.
		As lithium batteries age, they also become less capable of maintaining stable voltage
		during heavy power demand.
	</p>

	<p class="tech-muted mt-4 max-w-3xl mx-auto leading-relaxed">
		Tasks like opening the camera, gaming, using maximum brightness, or sudden CPU spikes
		can demand large bursts of power. If a degraded battery cannot safely supply this power,
		the voltage can suddenly drop below safe operating levels.
	</p>

	<p class="tech-muted mt-4 max-w-3xl mx-auto leading-relaxed">
		To prevent unexpected shutdowns and possible hardware instability, the iPhone Battery
		Management System (BMS) may cut power to the phone or reduce performance. This is the
		reason behind what became known as <span class="font-semibold">“BatteryGate”</span>,
		where older iPhones would dynamically slow down to reduce peak power demand.
	</p>

	<p class="tech-muted mt-4 max-w-3xl mx-auto leading-relaxed">
		In many cases, replacing a heavily degraded battery can improve not only battery life,
		but also overall responsiveness, stability, and peak performance.
	</p>

	<div class="mt-8 flex justify-center">
		<RouterLink
		to="/repair"
		class="tech-button px-5 py-3"
		>
		Book a Battery Replacement
		</RouterLink>
	</div>

	<p class="tech-soft mt-6 text-xs sm:text-sm flex flex-wrap justify-center items-center sm:gap-x-4 gap-x-2 gap-y-2">
		<Dot message="Improves stability" :color_selection="1"></Dot>
		<Dot message="Helps prevent shutdowns" :color_selection="1"></Dot>
		<Dot message="Restores peak performance" :color_selection="1"></Dot>
	</p>

	</section>
</template>
