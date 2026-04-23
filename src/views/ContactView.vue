<template>
  <main class="page-shell">
    <section class="tech-panel hero">
      <p class="tech-eyebrow">Book a repair</p>
      <h2>Tell us what happened</h2>
      <p class="tech-muted">
        Send through your iPhone model, the issue, and your preferred repair time. We will confirm the best option for you.
      </p>
      <div class="actions">
        <RouterLink to="/calculator" class="tech-button">Get Instant Quote</RouterLink>
        <button class="tech-button secondary" @click="copyAddress">Copy Address</button>
      </div>
    </section>

    <section class="grid">
      <article class="tech-card card">
        <p class="tech-eyebrow">Location</p>
        <h3>Clayton, Victoria</h3>
        <p class="tech-muted">Based near Monash University with easy parking for quick drop-offs.</p>
      </article>

      <article class="tech-card card">
        <p class="tech-eyebrow">Response</p>
        <h3>Same-day replies</h3>
        <p class="tech-muted">For common screen and battery repairs, we can usually quote from one message.</p>
      </article>
    </section>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'

function copyAddress() {
  const address = "2 Greenfield Drive, Clayton, Victoria"
  navigator.clipboard.writeText(address)
  alert("Address copied to clipboard!")
}
</script>

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

.actions,
.grid {
  display: grid;
  gap: 14px;
}

.actions {
  margin-top: 22px;
}

.grid {
  grid-template-columns: 1fr;
  margin-top: 20px;
}

@media (min-width: 640px) {
  .actions,
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
