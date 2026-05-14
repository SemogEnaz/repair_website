<template>

  <div class="container">

    <Hero/>
    <Contact/>
    <Calculator/>

  </div>

  <!-- FLOAT BUTTON -->
  <a href="#quote" class="floating">Get Quote</a>
</template>

<script setup>
import Hero from '@/components/HomePage/Hero.vue';
import Calculator from '@/components/HomePage/Calculator.vue';
import Contact from '@/components/HomePage/Contact.vue';
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
