<template>
  <main class="page-shell">
    <section class="tech-panel intro">
      <p class="tech-eyebrow">Repair quote</p>
      <h2>Price your iPhone repair</h2>
      <p class="tech-muted">
        Choose your iPhone model and the services you need for a quick estimate before you book.
      </p>
    </section>

    <Calculator />
  </main>
</template>

<script setup>
import Calculator from '@/components/HomePage/Calculator.vue'
</script>

<style scoped>
.page-shell {
  padding: 20px;
}

.intro {
  padding: 28px 24px;
  text-align: center;
}

.intro h2 {
  margin-top: 4px;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}
</style>
