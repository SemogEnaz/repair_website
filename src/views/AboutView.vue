<template>
  <main class="page-shell">
    <section class="tech-panel hero">
      <p class="tech-eyebrow">About the service</p>
      <h2>Apple-style care, local repair speed</h2>
      <p class="tech-muted">
        We focus on practical iPhone repairs with clear quotes, tidy workmanship, and fast turnaround for Clayton locals.
      </p>
    </section>

    <section class="stack">
      <article class="tech-card card">
        <p class="tech-eyebrow">Parts</p>
        <h3>Quality-first repairs</h3>
        <p class="tech-muted">Every repair is handled carefully with parts selected for reliable everyday use.</p>
      </article>

      <article class="tech-card card">
        <p class="tech-eyebrow">Process</p>
        <h3>Simple, transparent, quick</h3>
        <p class="tech-muted">You get the estimate first, then a clear repair window before any work begins.</p>
      </article>

      <article class="tech-card card">
        <p class="tech-eyebrow">Support</p>
        <h3>Warranty included</h3>
        <p class="tech-muted">If something does not feel right after the repair, we will help make it right.</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.page-shell {
  padding: 20px;
}

.hero,
.card {
  padding: 28px 24px;
}

.hero {
  text-align: center;
}

h2 {
  margin-top: 4px;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

h3 {
  margin-top: 4px;
  font-size: 1.35rem;
  font-weight: 800;
}

.stack {
  display: grid;
  gap: 14px;
  margin-top: 20px;
}
</style>
