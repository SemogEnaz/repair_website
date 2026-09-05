<template>
	<div class="price-card w-full sm:w-1/3 flex flex-col justify-between py-4 px-2">
		<p class="rolling-price text-center font-bold text-5xl sm:text-6xl">${{ animatedPrice }}</p>
		<p class="tech-muted text-xs sm: text-center">Time: {{ formattedTime }}</p>
	</div>
</template>

<script setup lang="js">
import { ref, computed, watch } from 'vue';
import { calculateRepairPrice } from '@/utils/pricing';

const quote = defineModel();

// Time estimates in minutes
const timeEstimates = {
  'screen': 30,
  'battery': 30,
  'back glass': 120,
  'charge port': 40
}

// ---------------- LOGIC ----------------

function calculateTime() {
  let total = 0

  const selected = quote.value.services.filter((_, i) => quote.value.selectedServices[i])
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

const finalPrice = computed(() => calculateRepairPrice(quote.value))

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
