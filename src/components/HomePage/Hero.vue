<template>
  <!-- HERO -->
  <section class="tech-panel hero-panel text-center px-4 py-8 sm:p-10">

    <!-- Heading -->
    <p class="tech-eyebrow">Fast local repairs</p>
    <h1 class="mt-2 text-3xl sm:text-4xl font-bold leading-tight tracking-tight">Fast iPhone Repairs in Clayton</h1>
    <p class="text-2xl sm:text-3xl font-bold text-blue-300 mt-1">Screen &amp; battery repairs in around 30 minutes*</p>
    <p class="tech-soft mt-2 text-xs">*Timing depends on the repair and parts availability. Back glass repairs can take around two hours. Confirm your appointment before visiting.</p>

    <!-- Description -->
    <p class="tech-muted pt-4 text-sm sm:text-base max-w-xl mx-auto">Screen replacement, battery replacement, back glass and charging port repairs at 2 Greenfield Drive, Clayton. Check an estimate and book a repair.</p>

    <!-- Buttons -->
    <div class="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto">
      <RouterLink to="/#quote" class="tech-button w-full sm:flex-1 px-5 py-3">Get Instant Quote</RouterLink>
      <RouterLink to="/#contactLinks" class="tech-button secondary w-full sm:flex-1 px-5 py-3">Message Now</RouterLink>
    </div>

    <!-- Trust -->
    <div class="tech-soft mt-6 text-xs sm:text-sm flex flex-wrap justify-center items-center sm:gap-x-4 gap-x-2 gap-y-2">
      <Dot message="Same-day repairs" />
      <Dot message="Clear repair estimates" />
      <Dot message="Warranty included" />
    </div>

  </section>
</template>

<script setup>
import Dot from '../Dot.vue';

</script>

<style>
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
