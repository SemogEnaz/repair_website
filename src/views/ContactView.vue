<template>
	<main id="main-content" class="p-5">
		<Contact heading-tag="h1" />
		<RouterLink to="/repair-prices" class="tech-button w-full mt-5 px-5 py-3"
			>Check repair prices before booking</RouterLink
		>
		<BusinessDetails />
	</main>
</template>
<script setup>
import Contact from '@/components/HomePage/Contact.vue'
import BusinessDetails from '@/components/BusinessDetails.vue'
</script>
