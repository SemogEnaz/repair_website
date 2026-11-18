<template>
  <div class="grid w-full grid-cols-2 gap-2 sm:flex sm:w-1/3 sm:flex-col">
    <button
      v-for="option in options"
      :key="option.value"
      @click="toggleService(option.position)"
      :aria-pressed="Boolean(quote.selectedServices[option.position])"
      :class="[
        'service-button w-full py-2',
        option.sharesRow ? 'col-span-1' : 'col-span-2',
        quote.selectedServices[option.position] ? 'selected font-bold' : '',
		progress == 1 ? 'needs-attention' : ''
      ]"
    >
      <span class="service-label" :class="{ 'has-premium-feature': quote.isPremium && option.premiumFeature }">
        <span>{{ option.label }}</span>
        <span v-if="option.premiumFeature" class="premium-feature" :aria-hidden="!quote.isPremium">
          <span class="premium-feature-clip">
            <span class="premium-feature-text">{{ option.premiumFeature }}</span>
          </span>
        </span>
      </span>
    </button>
  </div>
</template>

<script setup lang="js">
import { computed } from 'vue';
import { normalizeModelName, REPAIR_SERVICE } from '@/utils/pricing';
const quote = defineModel('quote');
const progress = defineModel('progress')
const { Alert } = defineProps(['Alert']);

const hasRearRepairPair = computed(() =>
  quote.value.services.includes(REPAIR_SERVICE.BACK_GLASS) &&
  quote.value.services.includes(REPAIR_SERVICE.HOUSING)
);

const options = computed(() =>
  quote.value.services.map((service, index) => ({
    label: service.charAt(0).toUpperCase() + service.slice(1),
    value: service,
    sharesRow: hasRearRepairPair.value &&
      (service === REPAIR_SERVICE.BACK_GLASS || service === REPAIR_SERVICE.HOUSING),
    premiumFeature: service === REPAIR_SERVICE.SCREEN && normalizeModelName(quote.value.model) !== '11'
      ? '(OLED)'
      : '',
    position: index,
  }))
);

const toggleService = (index) => {
  if (!quote.value.model) {
    Alert('Please select an iPhone model first!')
    return
  }

  const updatedServices = [...quote.value.selectedServices]
  updatedServices[index] = !updatedServices[index]

  quote.value = {
    ...quote.value,
    selectedServices: updatedServices
  }

  progress.value += 1
}

</script>

<style lang="css" scoped>
.service-label {
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  transform: translateX(0);
  transition: transform 450ms ease 250ms;
}

.service-label.has-premium-feature {
  transform: translateX(6px);
  transition-delay: 0ms;
}

.premium-feature {
  display: inline-grid;
  grid-template-columns: 0fr;
  font-size: 0.75em;
  font-weight: 400;
  transition: grid-template-columns 450ms ease 250ms;
}

.premium-feature-clip {
  min-width: 0;
  overflow: hidden;
}

.premium-feature-text {
  display: block;
  padding-left: 0.35rem;
  opacity: 0;
  transform: translateY(0.65em);
  white-space: nowrap;
  transition: opacity 250ms ease, transform 250ms ease;
}

.has-premium-feature .premium-feature {
  grid-template-columns: 1fr;
  transition-delay: 0ms;
}

.has-premium-feature .premium-feature-text {
  opacity: 0.65;
  transform: translateY(0);
  transition-duration: 350ms;
  transition-delay: 450ms;
}

@media (prefers-reduced-motion: reduce) {
  .service-label,
  .premium-feature,
  .premium-feature-text {
    transition: none;
  }
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
</style>
