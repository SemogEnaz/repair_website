<template>
  <div
  	:class='["flex flex-col items-center w-full sm:w-1/3 gap-2"]'>
    <button
      v-for="option in options"
      :key="option.value"
      @click="toggleService(option.position)"
      :class="[
        'service-button w-full py-2',
        quote.selectedServices[option.position] ? 'selected font-bold' : '',
		progress == 1 ? 'needs-attention' : ''
      ]"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="js">
import { computed } from 'vue';
const quote = defineModel('quote');
const progress = defineModel('progress')
const { Alert } = defineProps(['Alert']);

// Explain this later
const options = computed(() =>
  quote.value.services.map((service, index) => ({
    label: service.charAt(0).toUpperCase() + service.slice(1),
    value: service,
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
