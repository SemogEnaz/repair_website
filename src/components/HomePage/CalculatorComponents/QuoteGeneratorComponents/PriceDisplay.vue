<template>
	<div class="price-card w-full sm:w-1/3 flex flex-col justify-between py-4 px-2">
		<template v-if="hasEstimate">
			<p class="rolling-price text-center font-bold text-5xl sm:text-6xl">${{ animatedPrice }}</p>
			<p class="tech-muted text-xs text-center">Estimated time: {{ formattedTime }}</p>
		</template>
		<p v-else class="tech-muted text-sm text-center py-4">
			Select your model and repair to see an estimate.
		</p>
	</div>
</template>

<script setup lang="js">
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import { calculateRepairPrice, calculateRepairTime, formatRepairTime, getSelectedServices } from '@/utils/pricing';

const quote = defineModel();

const hasEstimate = computed(() => Boolean(quote.value.model && getSelectedServices(quote.value).length));
const formattedTime = computed(() => formatRepairTime(calculateRepairTime(quote.value)));

const animatedPrice = ref(0)

const finalPrice = computed(() => calculateRepairPrice(quote.value))
let animationFrame

onBeforeUnmount(() => {
  if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
})

watch(finalPrice, (newPrice) => {
  const start = animatedPrice.value
  const end = newPrice || 0

  if (quote.value.price !== end) {
    quote.value = {
      ...quote.value,
      price: end
    }
  }

  if (!import.meta.env.SSR && animationFrame !== undefined) cancelAnimationFrame(animationFrame)

  if (import.meta.env.SSR || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !hasEstimate.value) {
    animatedPrice.value = end
    return
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
      animationFrame = requestAnimationFrame(animate)
    } else {
      animatedPrice.value = end
    }
  }

  animationFrame = requestAnimationFrame(animate)
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
