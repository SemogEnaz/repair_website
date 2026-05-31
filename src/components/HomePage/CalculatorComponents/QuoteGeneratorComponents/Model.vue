<template>
  <div class="relative flex flex-col w-full !sm:w-1/3 self-start">
    <!-- Button -->
    <button
      :class="[
        'selector-button w-full py-2 px-1! flex items-center justify-center gap-2',
        model ? 'selected font-bold' : '',
		progress == 0 ? 'needs-attention' : ''
      ]"
      @click="toggleDropdown">
      <span class="">{{ model ? `iPhone ${model}` : 'Select Model' }}</span>
      <span class="caret" :class="{ open: isOpen }"></span>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="dropdown absolute top-full left-0 mt-2 w-full rounded-lg shadow-lg z-50">
      <div
	  	v-for="phone in phones" :key="phone"
	  	class="dropdown-option p-3 cursor-pointer"
		@click="selectModel(phone)">iPhone {{ phone }}</div>
    </div>

  </div>
</template>

<script setup lang="js">
import { ref } from 'vue';
const model = defineModel('model');
const progress = defineModel('progress');

const modelNumbers = [11, 12, 13, 14];

const modelVariants = [
	'Mini',
	'Plus',
	'Pro',
	'Pro Max',
];

const modelVariantMasks = [
	0b0011,
	0b1011,
	0b1011,
	0b1111,
];

const phones = [];

for (let i = 0; i < modelNumbers.length; i++) {
	const modelNumber = modelNumbers[i];
	const variantMask = modelVariantMasks[i];

	phones.push(String(modelNumber));

	for (let j = 0; j < modelVariants.length; j++) {
		const bitPosition = modelVariants.length - 1 - j;

		if (variantMask & (1 << bitPosition)) {
			phones.push(`${modelNumber} ${modelVariants[j]}`);
		}
	}
}

const isOpen = ref(false);

const updateProgress = () => {
	progress.value += 1;
}

const toggleDropdown = () => {
	isOpen.value = !isOpen.value;
};

const selectModel = (value) => {
	model.value = value;
	isOpen.value = false;
	updateProgress();
};
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
  overflow-y: auto;
  max-height: 10.75rem;
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
