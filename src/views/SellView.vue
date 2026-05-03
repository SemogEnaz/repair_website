<template>
  <section class="tech-panel flex flex-col items-center gap-6 p-6">

    <!-- Header -->
    <p class="tech-eyebrow">Sell your device</p>
    <h1 class="text-2xl sm:text-4xl font-bold tracking-tight">
      Get an Instant Buyback Estimate
    </h1>

    <!-- Main Card -->
    <div class="tech-card w-full flex flex-col gap-4 p-4">

      <div class="flex flex-col sm:flex-row gap-4">

        <!-- MODEL -->
        <div class="w-full sm:w-1/3">
          <button class="selector-button w-full py-2" @click="toggleModel">
            {{ model ? `iPhone ${model}` : 'Select Model' }}
          </button>

          <div v-if="showModel" class="dropdown mt-2">
            <div @click="selectModel('11')" class="dropdown-option p-2">iPhone 11</div>
            <div @click="selectModel('12')" class="dropdown-option p-2">iPhone 12</div>
            <div @click="selectModel('13')" class="dropdown-option p-2">iPhone 13</div>
            <div @click="selectModel('14')" class="dropdown-option p-2">iPhone 14</div>
          </div>
        </div>

        <!-- CONDITION -->
        <div class="w-full sm:w-1/3 flex flex-col gap-2">
          <button
            v-for="c in conditions"
            :key="c.value"
            @click="condition = c.value"
            :class="['service-button', condition === c.value ? 'selected' : '']"
          >
            {{ c.label }}
          </button>
          <RouterLink to="/buyback#condition-guide" class="tech-soft text-sm">What is the condition of my device?</RouterLink>
        </div>

        <!-- PRICE -->
        <div class="price-card w-full sm:w-1/3 flex flex-col justify-center items-center">
          <p class="text-3xl sm:text-5xl font-bold">
            ${{ estimate }}
          </p>
          <p class="tech-muted text-sm">Final price confirmed after inspection</p>
        </div>

      </div>

      <!-- CTA -->
      <div class="flex flex-col gap-3 mt-4">

        <input v-model="phone" placeholder="Phone number" class="input" />
        <input v-model="email" placeholder="(Optional) Email" class="input" />

        <button class="tech-button" @click="submit">
          Get My Offer
        </button>

      </div>

    </div>

    <!-- Trust -->
    <p class="tech-soft text-xs text-center">
      Fast quotes • Same-day pickup available • Cash or bank transfer
    </p>

  </section>

  <!-- GRADING GUIDE -->
<section class="tech-panel grading-guide flex flex-col gap-4" id="condition-guide">
  <div class="text-center">
    <p class="tech-eyebrow">Condition guide</p>
    <h2>What Each Grade Means</h2>
    <p class="tech-muted">
      This helps you understand how we estimate the buyback value before inspection.
    </p>
  </div>

  <div class="flex flex-col gap-3">
    <article class="tech-card grade-card">
      <h3>Grade A - Excellent</h3>
      <p class="tech-muted">
        Very clean condition. No cracks. Minor signs of use only. Screen, back glass, Face ID, cameras, buttons, and charging all work properly.
      </p>
    </article>

    <article class="tech-card grade-card">
      <h3>Grade B - Good</h3>
      <p class="tech-muted">
        Normal everyday wear. May have small scratches or light marks, but no major damage. Fully functional.
      </p>
    </article>

    <article class="tech-card grade-card">
      <h3>Grade C - Damaged</h3>
      <p class="tech-muted">
        Has visible damage such as cracked screen, cracked back glass, poor battery health, or other repairable issues.
      </p>
    </article>

    <article class="tech-card grade-card">
      <h3>Grade D - Faulty / Parts</h3>
      <p class="tech-muted">
        Not fully working. May have no power, Face ID issues, liquid damage, motherboard faults, or multiple major problems.
      </p>
    </article>
  </div>

  <p class="tech-soft text-xs text-center">
    Final offer depends on inspection, iCloud status, storage size, battery health, and whether all parts are working.
  </p>
</section>
</template>

<script setup>
import { ref, computed } from 'vue'

// ---------------- STATE ----------------
const model = ref('')
const condition = ref('')
const showModel = ref(false)

const phone = ref('')
const email = ref('')

// ---------------- OPTIONS ----------------
const conditions = [
  { label: 'Perfect', value: 'perfect' },
  { label: 'Good', value: 'good' },
  { label: 'Cracked Screen', value: 'cracked' },
  { label: 'Not Working', value: 'dead' }
]

// ---------------- PRICING ----------------
const basePrices = {
  '11': 90,
  '12': 100,
  '13': 120,
  '14': 150
}

const multipliers = {
  perfect: 1,
  good: 0.85,
  cracked: 0.6,
  dead: 0.3
}

// ---------------- COMPUTED ----------------
const estimate = computed(() => {
  if (!model.value || !condition.value) {
    return 0
  }

  const base = basePrices[model.value]
  const value = base * multipliers[condition.value]

  return Math.round(value)
})

// ---------------- ACTIONS ----------------
const toggleModel = () => showModel.value = !showModel.value

const selectModel = (val) => {
  model.value = val
  showModel.value = false
}

const submit = async () => {
  if (!phone.value && !email.value) return alert("Enter contact details")

  const payload = {
    model: model.value,
    condition: condition.value,
    estimate: estimate.value,
    phone: phone.value,
    email: email.value
  }

  await fetch(import.meta.env.VITE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "supersecret123"
    },
    body: JSON.stringify(payload)
  })

  alert("Offer request sent 👍")
}
</script>

<style scoped>
.selector-button,
.service-button {
  border: 1px solid rgba(148,163,184,0.2);
  border-radius: 10px;
  padding: 10px;
  background: var(--surface-3);
}

.service-button.selected {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.dropdown {
  background: white;
  color: black;
}

.input {
  padding: 10px;
  border-radius: 8px;
  background: rgba(30,41,59,0.7);
}

.grading-guide {
  margin-top: 20px;
  padding: 24px;
}

.grading-guide h2 {
  margin-top: 4px;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.grade-card {
  padding: 18px;
}

.grade-card h3 {
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 6px;
}
</style>
