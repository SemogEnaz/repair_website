<template>

  <div class="container">

    <Hero/>
    <ServicesList/>
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
      <p class="tech-muted"><strong>Screen Repair:</strong> 30-45 minutes</p>
      <p class="tech-muted"><strong>Battery Replacement:</strong> 20-30 minutes</p>
      <p class="tech-muted"><strong>Diagnostics:</strong> ~10 minutes</p>
      <p class="tech-muted">You can wait or come back later.</p>
    </section>

    <!-- LOCATION -->
    <section class="tech-panel content-section location">
      <p class="tech-eyebrow">Clayton based</p>
      <h2>Based in Clayton</h2>
      <p class="tech-muted">Near Monash University with easy parking available.</p>
    </section>

    <!-- CTA -->
    <section class="tech-panel cta" id="contact">
      <p class="tech-eyebrow">Ready when you are</p>
      <h2>Ready to Fix Your Phone?</h2>
      <div class="cta-actions">
        <a href="#quote" class="tech-button btn">Get Quote</a>
        <RouterLink to="/contact" class="tech-button secondary btn">Contact Us</RouterLink>
      </div>
    </section>

  </div>

  <!-- FLOAT BUTTON -->
  <a href="#quote" class="floating">Get Quote</a>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import Hero from '@/components/HomePage/Hero.vue';
import Calculator from '@/components/HomePage/Calculator.vue';
import ServicesList from '@/components/HomePage/ServicesList.vue';
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
