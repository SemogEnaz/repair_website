<template>
  <section class="flex flex-col sm:flex-row gap-4">

    <div class="card bg-blue-900/40">
      <h3>🏪 Visit Us</h3>
      <p>Quick repairs while you wait. Most fixes done in under 45 minutes.</p>
    </div>

    <div class="card dark-blue">
      <h3>🚗 We Come to You</h3>
      <p>Home, uni, or work. Same-day mobile service.</p>
    </div>

  </section>
</template>

<style scoped>

section {
  background: #111;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

.card {
  width: 100%;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
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
}
</style>
