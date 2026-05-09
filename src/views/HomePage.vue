<template>

  <div class="container">

    <Hero/>
    <Contact/>
    <Calculator/>

    <!-- TRUST -->
    <section class="tech-panel content-section trust-section">
      <p class="tech-eyebrow">Local confidence</p>
      <h2>Trusted by Local Customers</h2>
      <p class="tech-muted">Hundreds of devices repaired. High-quality parts. Repairs done right the first time.</p>
    </section>

    <!-- EXPECT -->
    <section class="tech-panel content-section expect">
      <p class="tech-eyebrow">Repair timing</p>
      <h2>What to Expect</h2>
      <p class="tech-muted"><strong>Screen Repair:</strong> 30 minutes</p>
      <p class="tech-muted"><strong>Battery Replacement:</strong> 30 minutes</p>
      <p class="tech-muted"><strong>Diagnostics:</strong> ~10 minutes</p>
      <p class="tech-muted">You can wait or come back later.</p>
    </section>

    <!-- LOCATION -->
    <section class="tech-panel content-section location">
      <p class="tech-eyebrow">Clayton based</p>
      <h2>Based in Clayton</h2>
      <p class="tech-muted">Near Clayton Station and M-city, giving you some places to check out while your repair is in progress.</p>
    </section>

  </div>

  <!-- FLOAT BUTTON -->
  <a href="#quote" class="floating">Get Quote</a>
</template>

<script setup>
import Hero from '@/components/HomePage/Hero.vue';
import Calculator from '@/components/Calculator.vue';
import Contact from '@/components/Contact.vue';
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.content-section {
  margin-top: 20px;
  padding: 24px;
  text-align: center;
}

.content-section h2,
.cta h2 {
  margin-top: 4px;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.expect {
  text-align: left;
}

/* CTA */
.cta {
  margin-top: 20px;
  text-align: center;
  padding: 40px 24px;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  padding: 12px 20px;
}

/* FLOAT BUTTON */
.floating {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: 1px solid rgba(191, 219, 254, 0.4);
  background: linear-gradient(135deg, var(--accent), #2563eb);
  box-shadow: var(--shadow-blue);
  padding: 15px 20px;
  border-radius: 50px;
  font-weight: bold;
  color: white;
}

/* MOBILE */
@media (min-width: 640px) {
  .cta-actions {
    flex-direction: row;
  }
}
</style>
