<template>
<div class="flex flex-col sm:flex-row w-full gap-4">

    <!-- Model and Parts Price -->
    <div class="flex flex-col items-center w-full sm:w-1/3 gap-3 sm:gap-0">

      <!-- MODEL -->
      <div class="relative flex flex-col w-full !sm:w-1/3 self-start">
        <!-- Button -->
        <button
          :class="[
            'selector-button w-full py-2 flex items-center justify-center gap-2',
            quote.model ? 'selected font-bold' : ''
          ]"
          @click="toggleDropdown"
        >
          {{ quote.model ? `iPhone ${quote.model}` : 'Select Model' }}
          <span class="caret" :class="{ open: isOpen }"></span>
        </button>

        <!-- Dropdown -->
        <div
          v-if="isOpen"
          class="dropdown absolute top-full left-0 mt-2 w-full rounded-lg shadow-lg z-50"
        >
          <div class="dropdown-option p-3 cursor-pointer" @click="selectModel('11')">iPhone 11</div>
          <div class="dropdown-option p-3 cursor-pointer" @click="selectModel('12')">iPhone 12</div>
          <div class="dropdown-option p-3 cursor-pointer" @click="selectModel('13')">iPhone 13</div>
        </div>

      </div>

      <!-- PARTS PRICE -->
      <!-- https://codepen.io/WebsiteMentor/pen/abKeyWw -->
      <div class="flex flex-col items-center justify-center gap-1 flex-start h-full">
        <p class="">Parts quality:</p>

        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="quote.isPremium">

          <div class="label-wrapper">
            <transition name="fade" mode="out-in">
              <p :key="quote.isPremium">
                {{ quote.isPremium ? 'Premium' : 'Budget' }}
              </p>
            </transition>
          </div>
        </div>
      </div>

    </div>

    <!-- SERVICES -->
    <div class="flex flex-col items-center w-full sm:w-1/3 gap-2">
      <button
        v-for="option in options"
        :key="option.value"
        @click="toggleService(option.position)"
        :class="[
          'service-button w-full py-2',
          quote.selectedServices[option.position]
            ? 'selected font-bold'
            : ''
        ]"
      >
        {{ option.label }}
      </button>
    </div>

    <!-- PRICE DISPLAY-->
    <div class="price-card w-full sm:w-1/3 flex flex-col justify-between py-4 px-2">

      <p class="rolling-price text-center font-bold text-5xl sm:text-6xl">
        ${{ animatedPrice }}
      </p>

      <p class="tech-muted text-xs sm: text-center">
        Time: {{ formattedTime }}
      </p>

    </div>

  </div>
</template>

<script setup lang="js">
import { ref, computed, onMounted, watch } from 'vue'

const quote = defineModel();
const { Alert } = defineProps({
  Alert: {
    type: Function,
    required: true
  }
})

// ---------------- DATA ----------------

const isOpen = ref(false)

const services = ['screen', 'battery', 'back glass', 'charge port']

// Explain this later
const options = computed(() =>
  services.map((service, index) => ({
    label: service.charAt(0).toUpperCase() + service.slice(1),
    value: service,
    position: index,
  }))
)

// ---------------- PRICING ----------------

const basePrice = 50;       // Minimum profit
const backGlassExcess = 20; // Excess for long or more specilized work

// List of all the prices for all parts of all models
const partsPrices = ref({});

onMounted(async () => {

  const response = await fetch("/parts_price.csv");
  const csvText = await response.text();

  partsPrices.value = csvToPartsPrices(csvText);
});

function csvToPartsPrices(csvText) {
  const lines = csvText.trim().split("\n").map(line => line.split(","));

  const partsPrices = {};

  for (let i = 3; i < lines.length; i++) {
    const row = lines[i];
    const model = row[0]?.trim();

    if (!model) continue;

    partsPrices[model] = {
      screen: {
        cheap: toNumber(row[1]),
        expensive: toNumber(row[2]),
      },
      battery: {
        cheap: toNumber(row[3]),
        expensive: toNumber(row[4]),
      },
      backGlass: toNumber(row[5]),
      chargePort: toNumber(row[6]),
      backCamera: toNumber(row[7]),
      earpieceSpeaker: toNumber(row[8]),
      loudSpeaker: toNumber(row[9]),
      buttons: toNumber(row[10]),
      cameraLens: toNumber(row[11]),
    };
  }

  return partsPrices;
}

function toNumber(value) {
  if (value === undefined || value.trim() === "") return null;
  return Number(value);
}

// Time estimates in minutes
const timeEstimates = {
  'screen': 30,
  'battery': 30,
  'back glass': 120,
  'charge port': 40
}

// ---------------- ACTIONS ----------------

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectModel = (val) => {
  quote.value.model = val
  isOpen.value = false
}

const toggleService = (index) => {
  if (!quote.value.model) {
    Alert('Please select an iPhone model first!')
    return
  }
  quote.value.selectedServices[index] = !quote.value.selectedServices[index]
}

// ---------------- LOGIC ----------------

const SERVICE = {
  SCREEN: 0,
  BATTERY: 1,
  BACK_GLASS: 2,
  CHARGE_PORT: 3,
};

function calculatePrice() {
  let parts = 0;

  // Return if no service is selected
  if (!quote.value.selectedServices.some(Boolean)) return 0;

  const selectedModel = partsPrices.value[quote.value.model];
  if (!selectModel) return 0;

  const quality = quote.value.isPremium ? "expensive" : "cheap";

  quote.value.selectedServices.forEach((isSelected, index) => {
    if (!isSelected) return;

    switch (index) {
      case SERVICE.SCREEN: parts += selectedModel.screen[quality]; break;
      case SERVICE.BATTERY: parts += selectedModel.battery[quality]; break;
      case SERVICE.BACK_GLASS: parts += selectedModel.backGlass + backGlassExcess; break;
      case SERVICE.CHARGE_PORT: parts += selectedModel.chargePort + backGlassExcess; break;
    }
  });

  // Adding 10% tax
  const taxedParts = Math.round(parts * 1.1);

  // Round up to closest 10's
  return Math.ceil((basePrice + taxedParts) / 10) * 10;
}

function calculateTime() {
  let total = 0

  const selected = services.filter((_, i) => quote.value.selectedServices[i])
  const hasScreen = selected.includes('screen')

  for (const service of selected) {
    if (service === 'battery' && hasScreen) continue
    total += timeEstimates[service]
  }

  return total
};

// ---------------- FORMAT ----------------

const formattedTime = computed(() => {
  const t = calculateTime()

  if (t < 60) return `${t} mins`

  const h = Math.floor(t / 60)
  const m = t % 60

  return m ? `${h} hrs ${m} mins` : `${h} hrs`
});

const animatedPrice = ref(0)

const finalPrice = computed(() => calculatePrice())

watch(finalPrice, (newPrice, oldPrice) => {
  const start = oldPrice || 0
  const end = newPrice || 0
  const duration = 450
  const startTime = performance.now()

  function animate(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // ease-out effect
    const eased = 1 - Math.pow(1 - progress, 3)

    animatedPrice.value = Math.round(start + (end - start) * eased)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      animatedPrice.value = end
    }
  }

  requestAnimationFrame(animate)
}, { immediate: true })
</script>

<style scoped>

.rolling-price {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.04em;
  text-shadow:
    0 0 18px rgba(59, 130, 246, 0.28),
    0 0 36px rgba(37, 99, 235, 0.18);
  transition:
    transform 0.2s ease,
    text-shadow 0.2s ease;
}

.rolling-price {
  font-family:
    "SF Pro Display",
    "Avenir Next",
    system-ui,
    sans-serif;
}

.calculator {
  margin-top: 20px;
  padding: 20px;
  overflow: visible;
}

.selector-button,
.service-button {
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: var(--radius-md);
  background: var(--surface-3);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.selector-button.selected,
.service-button.selected {
  border-color: rgba(191, 219, 254, 0.6);
  background: linear-gradient(135deg, var(--accent), #2563eb);
  box-shadow: var(--shadow-blue);
}

.selector-button:hover,
.service-button:hover {
  border-color: rgba(147, 197, 253, 0.42);
  transform: translateY(-1px);
}

.service-button.selected {
  border-color: rgba(191, 219, 254, 0.6);
  background: linear-gradient(135deg, var(--accent), #2563eb);
  box-shadow: var(--shadow-blue);
}

.dropdown {
  border: 1px solid rgba(147, 197, 253, 0.24);
  background: rgba(248, 250, 252, 0.96);
  color: #0f172a;
  overflow: hidden;
}

.dropdown-option {
  color: #0f172a;
}

.dropdown-option:hover {
  background: rgba(59, 130, 246, 0.12);
}

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
