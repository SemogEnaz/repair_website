<template>

  <div class="container">

    <HeroSection/>

    <ServicesSection/>
    
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
import HeroSection from '@/components/HeroSection.vue'
import ServicesSection from '@/components/ServicesSection.vue'
import Calculator from '@/components/CalculatorSection.vue'
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.container {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
}

/* HERO */
.hero {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(to bottom, #011544, #000);
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.hero p {
  color: #ccc;
  margin-bottom: 25px;
}

/* BUTTONS */
.btn {
  display: inline-block;
  padding: 12px 20px;
  border-radius: 8px;
  margin: 5px;
  font-weight: bold;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-secondary {
  background: #25D366;
  color: white;
}

.trust {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #aaa;
}

/* SERVICES */
.services {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 40px;
}

.card {
  flex: 1;
  min-width: 250px;
  background: #111;
  padding: 20px;
  border-radius: 10px;
}

.card h3 {
  margin-bottom: 10px;
}

/* CALCULATOR */
.calculator {
  margin-top: 60px;
  background: #111;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
}

select {
  padding: 10px;
  margin: 10px;
  border-radius: 6px;
  border: none;
}

.result {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #0f0;
}

/* TRUST */
.trust-section {
  margin-top: 60px;
  text-align: center;
}

/* EXPECT */
.expect {
  margin-top: 60px;
  background: #111;
  padding: 30px;
  border-radius: 10px;
}

/* LOCATION */
.location {
  margin-top: 60px;
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