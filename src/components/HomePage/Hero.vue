<template>
  <!-- HERO -->
  <section class="tech-panel hero-panel text-center px-4 py-6 sm:p-8">

    <!-- Heading -->
    <h1 class="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">Quick iPhone Repairs</h1>

    <!-- Description -->
    <p class="tech-muted mt-3 text-base max-w-md mx-auto">Screen, battery, back glass &amp; charging port repairs. <b>By appointment.</b></p>

    <!-- Buttons -->
    <div class="mt-5 flex flex-col items-center justify-center gap-3 w-full max-w-md mx-auto">
      <RouterLink to="/#quote" class="tech-button w-full px-5 py-3">Get Instant Quote</RouterLink>
      <RouterLink to="/#contactLinks" class="tech-button secondary w-full px-5 py-3">Message Now</RouterLink>
    </div>

    <!-- Trust -->
    <div class="tech-soft mt-4 text-xs sm:text-sm flex flex-wrap justify-center items-center sm:gap-x-4 gap-x-2 gap-y-2">
      <Dot message="Same-day repairs" />
      <Dot message="12-month repair warranty" />
    </div>

    <div class="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
      <a :href="business.googleProfile" target="_blank" rel="noopener noreferrer" class="text-blue-300 underline">Read our Google reviews</a>
      <RouterLink to="/about" class="text-blue-300 underline">About us &amp; warranty</RouterLink>
    </div>

  </section>
</template>

<script setup>
import Dot from '../Dot.vue';
import { business } from '@/data/business.js';

</script>

<style scoped>
.hero-panel {
  overflow: hidden;
  position: relative;
}

.hero-panel::before {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.18), transparent 34%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent);
  content: "";
}

.hero-panel > * {
  position: relative;
  z-index: 1;
}

</style>
