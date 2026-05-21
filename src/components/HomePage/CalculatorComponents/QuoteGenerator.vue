<template>
<div class="flex flex-col sm:flex-row w-full gap-4">

    <!-- Model and Parts Price -->
    <div class="flex flex-col items-center w-full sm:w-1/3 gap-3 sm:gap-0">

      <!-- MODEL -->
      <Model v-model="quote.model"/>

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
    <Service v-model="quote" :Alert=Alert />

    <!-- PRICE DISPLAY-->
    <PriceDisplay v-model="quote" />

  </div>
</template>

<script setup lang="js">
import Model from './QuoteGeneratorComponents/Model.vue';
import Service from './QuoteGeneratorComponents/Service.vue';
import PriceDisplay from './QuoteGeneratorComponents/PriceDisplay.vue';

const quote = defineModel();
const { Alert } = defineProps({
  Alert: {
    type: Function,
    required: true
  }
});
</script>

<style scoped>

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
