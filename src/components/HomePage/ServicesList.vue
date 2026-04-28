<template>
  <section class="tech-panel flex flex-col sm:flex-row gap-4">

    <div class="tech-card card">
      <p class="tech-eyebrow">Workshop</p>
      <h3>Visit Us</h3>
      <p class="tech-muted">Quick repairs while you wait. Most fixes done in under 45 minutes.</p>
    </div>

    <div class="tech-card card featured">
      <p class="tech-eyebrow">Outcall Service</p>
      <h3>We Come to You</h3>
      <p class="tech-muted">Home, uni, or work. Same-day mobile service for selected repairs.</p>
      <RouterLink to="/outcall" class="tech-button secondary mt-3 px-6 py-2">Learn More</RouterLink>
    </div>

  </section>
</template>

<style scoped>

section {
  padding: 20px;
  margin-top: 20px;
}

.card {
  width: 100%;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.featured {
  border-color: var(--line-strong);
  background:
    linear-gradient(145deg, rgba(30, 64, 175, 0.52), rgba(15, 23, 42, 0.76)),
    rgba(15, 23, 42, 0.78);
}

/* Desktop layout */
@media (min-width: 640px) {
  .card {
    width: 50%;
  }
}

h3 {
  font-size: 1.3rem;
  margin-bottom: 6px;
  margin-top: 4px;
}
</style>
