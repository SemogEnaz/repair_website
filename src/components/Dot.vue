<template>
    <span class="flex items-center sm:gap-2 gap-1"><span class="dot"></span>{{ message }}</span>
</template>

<script setup>
defineProps({
  message: {
    type: String, required: true
  }
});
</script>

<style lang="css" scoped>
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px rgba(59,130,246,0.6);
}
</style>
