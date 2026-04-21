<template>
    <section id="quote" class="calculator">
      <h2>Get Your Repair Price in Seconds</h2>

      <select v-model="selectedModel">
        <option disabled value="">Select Model</option>
        <option value="11">iPhone 11</option>
        <option value="12">iPhone 12</option>
        <option value="13">iPhone 13</option>
      </select>

      <div class="flex flex-col items-center">
        <button
          v-for="option in options"
          :key="option.value"
          @click="selectedOption = option.value"
          :class="['w-2/3 sm:w-1/3 btn hover:border-blue-500 border-3 border-transparent !p-1', selectedOption === option.value ? 'btn-primary' : '']"
        >
          {{ option.label }}
        </button>
      </div>

      <div class="result" v-if="price">
        Estimated Price: ${{ price }} <br />
        Time: ~30–45 mins
      </div>

      <a href="#contact" class="btn btn-primary">Book This Repair</a>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';

// state
const selectedModel = ref('')
const selectedIssue = ref('')
const selectedOption = ref(null);

const options = [
  { label: 'Battery', value: 'battery' },
  { label: 'Screen', value: 'screen' },
  { label: 'Back Glass', value: 'back' }
]

// links (replace these)

// pricing logic
const price = computed(() => {
  if (!selectedModel.value || !selectedIssue.value) return null

  if (selectedIssue.value === 'screen') {
    if (selectedModel.value === '11') return 89
    if (selectedModel.value === '12') return 109
    if (selectedModel.value === '13') return 129
  }

  if (selectedIssue.value === 'battery') {
    if (selectedModel.value === '11') return 59
    if (selectedModel.value === '12') return 69
    if (selectedModel.value === '13') return 79
  }

  return null
})
</script>

<style scoped>
/* CALCULATOR */
.calculator {
  margin-top: 60px;
  background: #111;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
}

.result {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #0f0;
}
</style>