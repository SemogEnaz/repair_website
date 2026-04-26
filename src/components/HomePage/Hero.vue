<template>
  <!-- HERO -->
  <section class="tech-panel hero-panel text-center px-4 py-8 sm:p-10">

    <!-- Heading -->
    <p class="tech-eyebrow">Fast local repairs</p>
    <h1 class="mt-2 text-2xl sm:text-4xl font-bold leading-tight tracking-tight">Fast iPhone Repairs in Clayton</h1>
    <h2 class="text-2xl sm:text-4xl font-bold text-blue-300 mt-1">Done in 30 Minutes*</h2>
    <p class="tech-soft mt-0 text-xs">*Back glass replacements take ~2 hours or 20 minutes, depending on availability.</p>

    <!-- Description -->
    <p class="tech-muted pt-4 text-sm sm:text-base max-w-xl mx-auto">Screens, batteries, and more. Same-day service. We come to you or repair on the spot.</p>

    <!-- Buttons -->
    <div class="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto">
      <a href="/calculator#quote" class="tech-button w-full sm:flex-1 px-5 py-3">Get Instant Quote</a>
      <a href="/contact#contactLinks" class="tech-button secondary w-full sm:flex-1 px-5 py-3">Message Now</a>
    </div>

    <!-- Trust -->
    <div class="tech-soft mt-6 text-xs sm:text-sm flex flex-wrap justify-center items-center sm:gap-x-4 gap-x-2 gap-y-2">
      <span class="flex items-center sm:gap-2 gap-1"><span class="dot"></span>Same-day repairs</span>
      <span class="flex items-center sm:gap-2 gap-1"><span class="dot"></span>No data loss</span>
      <span class="flex items-center sm:gap-2 gap-1"><span class="dot"></span>Warranty included</span>
    </div>

  </section>
</template>

<script setup>
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

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px rgba(59,130,246,0.6);
}
</style>
