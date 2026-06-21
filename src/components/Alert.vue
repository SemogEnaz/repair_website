<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">

    <!-- Background overlay -->
    <div class="absolute inset-0 bg-black/60"></div>

    <!-- Alert box -->
      <div
        class="relative tech-card alert-box p-6 max-w-[90%] text-center"
        :class="alertClass"
      >
      <p class="text-lg font-semibold mb-4">
        {{ message }}
      </p>

      <button class="tech-button w-full" :class="buttonClass" @click="close">
        OK
      </button>

    </div>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const show = ref(false)
const message = ref('')
const variant = ref('default')

function trigger(msg, options = {}) {
  message.value = msg
  variant.value = options.variant || 'default'
  show.value = true
}

function close() {
  show.value = false
}

const alertClass = computed(() => ({
  'alert-box-default': variant.value === 'default',
  'alert-box-failure': variant.value === 'failure'
}))

const buttonClass = computed(() => ({
  'failure-button': variant.value === 'failure'
}))

defineExpose({ trigger })
</script>

<style scoped>
.alert-box {
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.25);
}

.alert-box-failure {
  border-color: rgba(248, 113, 113, 0.74);
  background:
    linear-gradient(145deg, rgba(69, 10, 10, 0.92), rgba(15, 23, 42, 0.74)),
    rgba(30, 41, 59, 0.86);
  box-shadow:
    0 0 0 1px rgba(248, 113, 113, 0.16),
    0 0 42px rgba(220, 38, 38, 0.28);
}

.failure-button {
  border-color: rgba(254, 202, 202, 0.5);
  background:
    linear-gradient(135deg, rgba(220, 38, 38, 0.96), rgba(153, 27, 27, 0.96)),
    #dc2626;
  box-shadow: 0 16px 42px rgba(220, 38, 38, 0.24);
}
</style>
