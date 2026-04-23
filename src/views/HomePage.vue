<template>

  <div class="container">

    <Hero/>
    <ServicesList/>
    <Calculator/>

    <!-- TRUST -->
    <section class="trust-section">
      <h2>Trusted by Local Customers</h2>
      <p>Hundreds of devices repaired. High-quality parts. Repairs done right the first time.</p>
    </section>

    <!-- EXPECT -->
    <section class="expect">
      <h2>What to Expect</h2>
      <p><strong>Screen Repair:</strong> 30–45 minutes</p>
      <p><strong>Battery Replacement:</strong> 20–30 minutes</p>
      <p><strong>Diagnostics:</strong> ~10 minutes</p>
      <p>You can wait or come back later.</p>
    </section>

    <!-- LOCATION -->
    <section class="location">
      <h2>Based in Clayton</h2>
      <p>Near Monash University • Easy parking available</p>
    </section>

    <!-- CTA -->
    <section class="cta" id="contact">
      <h2>Ready to Fix Your Phone?</h2>
      <a href="#quote" class="btn btn-primary">Get Quote</a>
      <a :href="whatsappLink" class="btn btn-secondary">WhatsApp</a>
    </section>

  </div>

  <!-- FLOAT BUTTON -->
  <a href="#quote" class="floating">Get Quote</a>
</template>

<script setup>
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

/* LOCATION */
.location {
  margin-top: 30px;
  text-align: center;
}

/* CTA */
.cta {
  margin-top: 60px;
  text-align: center;
  padding: 40px;
  background: #011544;
  border-radius: 10px;
}

/* FLOAT BUTTON */
.floating {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #007bff;
  padding: 15px 20px;
  border-radius: 50px;
  font-weight: bold;
  color: white;
}

/* MOBILE */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 1.8rem;
  }
}
</style>
