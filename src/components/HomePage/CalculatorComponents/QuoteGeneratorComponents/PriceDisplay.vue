<template>
	<div class="price-card w-full sm:w-1/3 flex flex-col justify-between py-4 px-2">
		<p class="rolling-price text-center font-bold text-5xl sm:text-6xl">${{ animatedPrice }}</p>
		<p class="tech-muted text-xs sm: text-center">Time: {{ formattedTime }}</p>
	</div>
</template>

<script setup lang="js">
import { ref, computed, onMounted, watch } from 'vue';
const quote = defineModel();

const services = ['screen', 'battery', 'back glass', 'charge port']

// ---------------- PRICING ----------------

const basePrice = 50;       // Minimum profit
const backGlassExcess = 20; // Excess for long or more specilized work

// Time estimates in minutes
const timeEstimates = {
  'screen': 30,
  'battery': 30,
  'back glass': 120,
  'charge port': 40
}

// ---------------- LOGIC ----------------

const SERVICE = {
  SCREEN: 0,
  BATTERY: 1,
  BACK_GLASS: 2,
  CHARGE_PORT: 3,
};

// List of all the prices for all parts of all models
const partsPrices = ref({});

// Load the parts price data
onMounted(async () => {

  const response = await fetch("/parts_price.csv");
  const csvText = await response.text();

  partsPrices.value = csvToPartsPrices(csvText);
});

function normalizeModel(value) {
  return String(value)
    .toLowerCase()
    .replace(/\s+/g, '');
}

function csvToPartsPrices(csvText) {
  const lines = csvText.trim().split("\n").map(line => line.split(","));

  const partsPrices = {};

  for (let i = 3; i < lines.length; i++) {
    const row = lines[i];
	const model = normalizeModel(row[0]);

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

function getPartPrice(part, quality) {
  if (typeof part === 'number') return part;

  return part[quality] ?? part.cheap ?? part.expensive ?? 0;
}

function calculatePrice() {
  let parts = 0;

  // Return if no service is selected
  if (!quote.value.selectedServices.some(Boolean)) return 0;

const selectedModelKey = normalizeModel(quote.value.model);
const selectedModel = partsPrices.value[selectedModelKey];

if (!selectedModel) return 0;

  const quality = quote.value.isPremium ? "expensive" : "cheap";

  quote.value.selectedServices.forEach((isSelected, index) => {
    if (!isSelected) return;

    switch (index) {
      case SERVICE.SCREEN: parts += getPartPrice(selectedModel.screen, quality); break;
      case SERVICE.BATTERY: parts += getPartPrice(selectedModel.battery, quality); break;
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

  if (quote.value.price !== end) {
    quote.value = {
      ...quote.value,
      price: end
    }
  }

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
}, { immediate: true });

</script>

<style lang="css" scoped>

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

.price-card {
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-md);
  background:
    radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.22), transparent 58%),
    rgba(15, 23, 42, 0.62);
}

</style>
