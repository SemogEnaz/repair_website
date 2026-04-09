<template>
    <section id="quote" class="calculator">
      <h2>Get Your Repair Price in Seconds</h2>

      <select v-model="selectedModel">
        <option disabled value="">Select Model</option>
        <option value="11">iPhone 11</option>
        <option value="12">iPhone 12</option>
        <option value="13">iPhone 13</option>
      </select>

      <select v-model="selectedIssue">
        <option disabled value="">Select Issue</option>
        <option value="screen">Screen</option>
        <option value="battery">Battery</option>
      </select>

      <select v-model="selectedService">
        <option disabled value="">Service Type</option>
        <option value="visit">Visit</option>
        <option value="outcall">Outcall</option>
      </select>

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
const selectedService = ref('')

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