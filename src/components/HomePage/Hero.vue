<template>
    <!-- HERO -->
  <section class="hero">
    <h1>Fast iPhone Repairs in Clayton — Done in 30 Minutes*</h1>
    <p>Screens, batteries, and more. Same-day service. We come to you or repair on the spot.</p>

    <a href="#quote" class="btn btn-primary">Get Instant Quote</a>
    <a :href="messengerLink" class="btn btn-secondary">Message Now</a>

    <div class="trust">
      ✔ Same-day repairs &nbsp; ✔ No data loss &nbsp; ✔ Warranty included
    </div>
    <p>*Back glass replacements will take 2 hours</p>
  </section>
</template>

<script setup>
const messengerLink = "https://m.me/YOUR_USERNAME";
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(to bottom, #011544, #000);
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.hero p {
  color: #ccc;
  margin-bottom: 25px;
}

.trust {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #aaa;
}
</style>
