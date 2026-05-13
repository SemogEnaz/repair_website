<template>
    <span class="flex items-center sm:gap-2 gap-1"><span :class="dot_color"></span>{{ message }}</span>
</template>

<script setup>
const props = defineProps({
  message: { type: String, required: true },
  /* Choose the color from the array of color classes
  Here its 0 for blue, 1 for green and 2 for amber*/
  color_selection: { type: Number, default: 0 },
});

const colors = [
  "dot-blue", 'dot-green', 'dot-amber'
];

const dot_color = colors[props.color_selection] || 'dot-blue';
</script>

<style lang="css" scoped>
.dot-blue {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px rgba(59,130,246,0.6);
}

.dot-green {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgb(34, 197, 94); /* green-500 */
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.95);
}

.dot-amber {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgb(245, 158, 11); /* amber-500 */
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.9);
}
</style>
