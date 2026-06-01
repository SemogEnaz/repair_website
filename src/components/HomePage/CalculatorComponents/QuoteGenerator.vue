<template>
<div class="flex flex-col sm:flex-row w-full gap-4">

    <!-- Model and Parts Price -->
    <div class="flex flex-col items-center w-full sm:w-1/3 gap-3 sm:gap-0">

      <!-- MODEL -->
      <Model v-model="quote.model"/>

      <!-- PARTS PRICE -->
      <!-- https://codepen.io/WebsiteMentor/pen/abKeyWw -->
      <Quality v-model="quote"/>

    </div>

    <!-- SERVICES -->
    <Service v-model="quote" :Alert=Alert />

    <!-- PRICE DISPLAY-->
    <PriceDisplay v-model="quote" />

  </div>
</template>

<script setup lang="js">
import Model from './QuoteGeneratorComponents/Model.vue';
import Service from './QuoteGeneratorComponents/Service.vue';
import PriceDisplay from './QuoteGeneratorComponents/PriceDisplay.vue';
import Quality from './QuoteGeneratorComponents/Quality.vue';

const quote = defineModel();
const { Alert } = defineProps({
  Alert: {
    type: Function,
    required: true
  }
});
</script>
