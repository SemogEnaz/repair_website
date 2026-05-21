<template>
  <section id="quote" class="tech-panel calculator flex flex-col items-center gap-6 px-4 py-8 sm:p-10">

    <p class="tech-eyebrow">Instant estimate</p>
    <h1 class="text-2xl sm:text-4xl font-bold tracking-tight">
      Calculate Repair Price Estimate
    </h1>

    <!-- Column Titles (desktop only) -->
    <div class="tech-card hidden sm:flex w-full gap-4 justify-evenly p-4 text-sm">
      <p class="w-1/3 text-center">iPhone Model</p>
      <p class="w-1/3 text-center">Services</p>
      <p class="w-1/3 text-center">Price & Time</p>
    </div>

    <!-- Main Content -->
    <div class="tech-card flex flex-col sm:flex-row w-full gap-4 p-4">

      <!-- Calculator and Submission form-->
      <div class="flex flex-col w-full gap-4">

        <!-- Just Calculator -->
        <!-- Cant send the alert ref down but we can send a funciton that changes the alert ref of the parent -->
        <QuoteGenerator v-model="quote" :Alert="(message) => alertRef?.trigger(message)"/>

        <!-- Selected services summary -->
        <ServiceSummary :quote="quote"/>

        <!-- Contact form information -->
        <SubmitQuote :quote="quote" :Alert="(message) => alertRef?.trigger(message)"/>

      </div>

    </div>

    <div>
      <p class="tech-soft text-xs text-center">
        *Further communications may take place over facebook, whatsapp or other messaging platforms. This form is just an initial estimate and isn't a binding quote.
      </p>
    </div>

  </section>

  <Alert ref="alertRef" />

</template>

<script setup>
import { ref } from 'vue'
import Alert from '../Alert.vue'
import ServiceSummary from './CalculatorComponents/ServiceSummary.vue';
import SubmitQuote from './CalculatorComponents/SubmitQuote.vue';
import QuoteGenerator from './CalculatorComponents/QuoteGenerator.vue';

// ---------------- DATA ----------------

const alertRef = ref(null);

const services = ['screen', 'battery', 'back glass', 'charge port']

const quote = ref({
  model: '',
  services: services,
  selectedServices: services.map(() => false),
  isPremium: false,
  price: 0,
  time: '',
});

</script>

<style scoped>

.price-card {
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-md);
  background:
    radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.22), transparent 58%),
    rgba(15, 23, 42, 0.62);
}

.caret {
  width: 6px;
  height: 6px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
  transition: transform 0.25s ease;
}

.caret.open {
  transform: rotate(225deg);
}

input[type="checkbox"] {
  position: relative;
  width: 72px;
  height: 38px;
  appearance: none;
  -webkit-appearance: none;

  background: linear-gradient(
    180deg,
    rgba(30, 41, 59, 0.95),
    rgba(15, 23, 42, 0.95)
  );

  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 999px;

  cursor: pointer;
  transition: all 0.25s ease;

  box-shadow:
    inset 0 1px 2px rgba(255,255,255,0.05),
    inset 0 -2px 6px rgba(0,0,0,0.35),
    0 0 0 rgba(59,130,246,0);
}

input[type="checkbox"]::before {
  content: "";

  position: absolute;
  top: 3px;
  left: 3px;

  width: 30px;
  height: 30px;
  border-radius: 50%;

  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.95),
    rgba(226,232,240,0.95)
  );

  transition: all 0.25s ease;

  box-shadow:
    0 2px 8px rgba(0,0,0,0.35),
    inset 0 1px 1px rgba(255,255,255,0.4);
}

input[type="checkbox"]:checked {
  background: linear-gradient(135deg, var(--accent), #2563eb);
  border-color: rgba(191, 219, 254, 0.6);
  box-shadow:
    0 0 16px rgba(59,130,246,0.25),
    inset 0 1px 2px rgba(255,255,255,0.08);
}

input[type="checkbox"]:checked::before {
  transform: translateX(34px);
}

.label-wrapper {
  min-width: 80px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

</style>
