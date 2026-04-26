<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">

    <!-- Background overlay -->
    <div class="absolute inset-0 bg-black/60"></div>

    <!-- Alert box -->
      <div class="relative tech-card p-6 max-w-[90%] max-w-md text-center shadow-[0_0_40px_rgba(59,130,246,0.25)]">
      <p class="text-lg font-semibold mb-4">
        {{ message }}
      </p>

      <button class="tech-button w-full" @click="close">
        OK
      </button>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)
const message = ref('')

function trigger(msg) {
  message.value = msg
  show.value = true
}

function close() {
  show.value = false
}

// 🔥 required
defineExpose({ trigger })
</script>
