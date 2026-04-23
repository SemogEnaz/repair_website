<template>
  <section id="quote" class="calculator flex flex-col items-center gap-6">

    <h1 class="text-2xl sm:text-4xl font-bold">
      Calculate Repair Price Estimate
    </h1>

    <!-- Column Titles (desktop only) -->
    <div class="hidden sm:flex w-full gap-4 justify-evenly bg-slate-800/60 rounded-lg p-4 text-sm text-slate-300">
      <p class="w-1/3 text-center">iPhone Model</p>
      <p class="w-1/3 text-center">Services</p>
      <p class="w-1/3 text-center">Price & Time</p>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col sm:flex-row w-full gap-4 bg-slate-800/60 rounded-lg p-4 overflow-visible">
      <!-- MODEL -->
      <div class="relative flex flex-col w-full sm:w-1/3 self-start">
        <!-- Button -->
        <button
          class="w-full py-2 rounded-lg bg-slate-700 text-white flex items-center justify-center gap-2"
          @click="toggleDropdown"
        >
          {{ model ? `iPhone ${model}` : 'Select Model' }}
          <span class="caret" :class="{ open: isOpen }"></span>
        </button>

        <!-- Dropdown -->
        <div
          v-if="isOpen"
          class="absolute top-full left-0 mt-2 w-full bg-white text-black rounded-lg shadow-lg z-50"
        >
          <div class="p-3 cursor-pointer hover:bg-gray-100 !text-black" @click="selectModel('11')">iPhone 11</div>
          <div class="p-3 cursor-pointer hover:bg-gray-100 !text-black" @click="selectModel('12')">iPhone 12</div>
          <div class="p-3 cursor-pointer hover:bg-gray-100 !text-black" @click="selectModel('13')">iPhone 13</div>
        </div>

      </div>

      <!-- SERVICES -->
      <div class="flex flex-col items-center w-full sm:w-1/3 gap-2">
        <button
          v-for="option in options"
          :key="option.value"
          @click="toggleService(option.position)"
          :class="[
            'w-full py-2 rounded-lg border border-transparent',
            selectedServices[option.position]
              ? 'bg-blue-500 text-white font-bold'
              : 'bg-slate-700 text-white'
          ]"
        >
          {{ option.label }}
        </button>
      </div>

      <!-- PRICE -->
      <div class="rounded-lg border border-blue-500 text-white w-full sm:w-1/3 flex flex-col justify-between py-4 px-2">

        <p class="text-center font-bold text-3xl sm:text-6xl">
          ${{ calculatePrice() }}
        </p>

        <p class="text-sm text-center text-slate-300">
          Time: {{ formattedTime }}
        </p>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// ---------------- DATA ----------------

const model = ref('')
const isOpen = ref(false)

const services = ['screen', 'battery', 'back glass', 'charge port']

const selectedServices = ref(services.map(() => false))

const options = computed(() =>
  services.map((service, index) => ({
    label: service.charAt(0).toUpperCase() + service.slice(1),
    value: service,
    position: index,
  }))
)

// ---------------- PRICING ----------------

const screenPrices = { '11': 20, '12': 20, '13': 25 }
const batteryPrices = { '11': 15, '12': 15, '13': 15 }
const backGlassPrices = { '11': 50, '12': 50, '13': 50 }
const chargePortPrices = { '11': 10, '12': 15, '13': 15 }

const timeEstimates = {
  'screen': 20,
  'battery': 20,
  'back glass': 120,
  'charge port': 40
}

// ---------------- ACTIONS ----------------

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectModel = (val) => {
  model.value = val
  isOpen.value = false
}

const toggleService = (index) => {
  if (!model.value) {
    alert('Please select an iPhone model first!')
    return
  }
  selectedServices.value[index] = !selectedServices.value[index]
}

// ---------------- LOGIC ----------------

function calculatePrice() {
  let total = 50

  selectedServices.value.forEach((isSelected, index) => {
    if (!isSelected) return

    switch (index) {
      case 0: total += screenPrices[model.value]; break
      case 1: total += batteryPrices[model.value]; break
      case 2: total += backGlassPrices[model.value] + 20; break
      case 3: total += chargePortPrices[model.value] + 20; break
    }
  })

  return total === 50 ? 0 : total
}

function calculateTime() {
  let total = 0

  const selected = services.filter((_, i) => selectedServices.value[i])
  const hasScreen = selected.includes('screen')

  for (const service of selected) {
    if (service === 'battery' && hasScreen) continue
    total += timeEstimates[service]
  }

  return total
}

// ---------------- FORMAT ----------------

const formattedTime = computed(() => {
  const t = calculateTime()

  if (t < 60) return `${t} mins`

  const h = Math.floor(t / 60)
  const m = t % 60

  return m ? `${h} hrs ${m} mins` : `${h} hrs`
})
</script>

<style scoped>
.calculator {
  margin-top: 20px;
  background: #111;
  padding: 20px;
  border-radius: 10px;
  overflow: visible;
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
</style>
