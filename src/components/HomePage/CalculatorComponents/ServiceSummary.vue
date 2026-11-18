<template>
  <p class="text-center" :class="{ hidden: !quote.model || !selectedServicesText }">
    iPhone {{ quote.model }} · {{ selectedServicesText }}
    <span v-if="quality !== 'Not applicable'"> · {{ quality }} parts</span>
  </p>
</template>

<script setup lang="js">
import { computed } from 'vue';
import { getPartsQualityLabel } from '@/utils/repairQuote.js';

const { quote } = defineProps(['quote']);
const quality = computed(() => getPartsQualityLabel(quote));

const selectedServicesText = computed(() => {

  const selected = quote.services.filter((_, index) => {
    return quote.selectedServices[index]
  })

  if (!selected.length) return ''

  return selected
    .map(service => service.charAt(0).toUpperCase() + service.slice(1))
    .join(' + ')
})

</script>

