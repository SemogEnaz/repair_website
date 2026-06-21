<template>
<div class="flex flex-col sm:flex-row w-full gap-4">

    <!-- Model and Parts Price -->
    <div class="flex flex-col items-center w-full sm:w-1/3 gap-3 sm:gap-0">

      <!-- MODEL -->
      <Model v-model:model="quote.model" v-model:progress="progress"/>

      <!-- PARTS PRICE -->
      <!-- https://codepen.io/WebsiteMentor/pen/abKeyWw -->
      <Quality v-model="quote"/>

    </div>

    <!-- SERVICES -->
    <Service v-model:quote="quote" v-model:progress="progress" :Alert="Alert"  />

    <!-- PRICE DISPLAY-->
    <PriceDisplay v-model="quote" />

  </div>
</template>

<script setup lang="js">
import Model from './QuoteGeneratorComponents/Model.vue';
import Service from './QuoteGeneratorComponents/Service.vue';
import PriceDisplay from './QuoteGeneratorComponents/PriceDisplay.vue';
import Quality from './QuoteGeneratorComponents/Quality.vue';

import { ref } from 'vue';

const quote = defineModel();
const { Alert } = defineProps({
  Alert: {
    type: Function,
    required: true
  }
});

const progress = ref(0);

</script>

<style lang="css">
@media screen and (min-width: 640px) {
  .needs-attention {
    box-shadow:
      0 0 14px rgba(59, 130, 246, 0.55),
      0 0 28px rgba(59, 130, 246, 0.28);
  }

  .needs-soft-attention {
    box-shadow:
      0 0 6px rgba(59, 130, 246, 0.22);
    border-color: rgba(147, 197, 253, 0.35);
  }
}
</style>
