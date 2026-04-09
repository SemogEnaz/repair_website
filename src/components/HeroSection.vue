<template>
    <!-- HERO -->
  <section class="hero">
    <h1>Fast iPhone Repairs in Clayton — Done in 30 Minutes</h1>
    <p>Screens, batteries, and more. Same-day service. We come to you or repair on the spot.</p>

    <a href="#quote" class="btn btn-primary">Get Instant Quote</a>
    <a :href="messengerLink" class="btn btn-secondary">Message Now</a>

    <div class="trust">
      ✔ Same-day repairs &nbsp; ✔ No data loss &nbsp; ✔ Warranty included
    </div>
  </section>
</template>

<script setup>
const messengerLink = "https://m.me/YOUR_USERNAME";
</script>
