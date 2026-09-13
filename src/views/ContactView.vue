<template>
	<main id="main-content" class="p-5">
		<section class="tech-panel p-6">
			<p class="tech-eyebrow">Bookings &amp; enquiries</p>
			<h1 class="text-3xl sm:text-4xl font-bold mt-2">Contact iPhone Repair Clayton</h1>
			<p class="tech-muted mt-4">
				Call or message with your iPhone model, the repair you need and a preferred time. We
				will confirm your quote and appointment before you visit.
			</p>
		</section>
		<Contact />
		<BusinessDetails />
		<RouterLink to="/repair-prices" class="tech-button w-full px-5 py-3"
			>Check repair prices before booking</RouterLink
		>
	</main>
</template>
<script setup>
import Contact from '@/components/HomePage/Contact.vue'
import BusinessDetails from '@/components/BusinessDetails.vue'
</script>
