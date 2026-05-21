<template>
  <div class="relative flex flex-col w-full !sm:w-1/3 self-start">
    <!-- Button -->
    <button
      :class="[
        'selector-button w-full py-2 flex items-center justify-center gap-2',
        model ? 'selected font-bold' : ''
      ]"
      @click="toggleDropdown"
    >
      {{ model ? `iPhone ${model}` : 'Select Model' }}
      <span class="caret" :class="{ open: isOpen }"></span>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="dropdown absolute top-full left-0 mt-2 w-full rounded-lg shadow-lg z-50"
    >
      <div class="dropdown-option p-3 cursor-pointer" @click="selectModel('11')">iPhone 11</div>
      <div class="dropdown-option p-3 cursor-pointer" @click="selectModel('12')">iPhone 12</div>
      <div class="dropdown-option p-3 cursor-pointer" @click="selectModel('13')">iPhone 13</div>
    </div>

  </div>
</template>

<script setup lang="js">
import { ref } from 'vue';
const model = defineModel();

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectModel = (val) => {
  model.value = val
  isOpen.value = false
}
</script>

<style lang="css" scoped>
.calculator {
  margin-top: 20px;
  padding: 20px;
  overflow: visible;
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

.dropdown {
  border: 1px solid rgba(147, 197, 253, 0.24);
  background: rgba(248, 250, 252, 0.96);
  color: #0f172a;
  overflow: hidden;
}

.dropdown-option {
  color: #0f172a;
}

.dropdown-option:hover {
  background: rgba(59, 130, 246, 0.12);
}

.caret {
  width: 6px;
  height: 6px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
  transition: transform 0.25s ease;
}

.caret.open {
  transform: rotate(225deg);
}
</style>
