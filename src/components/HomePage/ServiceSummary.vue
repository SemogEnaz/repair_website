<template>
  <p class="text-center" :class="{ hidden: !quote.model || !selectedServicesText }">
    Repair my iPhone {{ quote.model }} {{ selectedServicesText }}
  </p>
</template>

<script setup lang="js">
import { computed } from 'vue';

const { quote } = defineProps(['quote']);

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

