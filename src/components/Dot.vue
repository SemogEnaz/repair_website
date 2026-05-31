<template>
    <span class="flex items-center sm:gap-2 gap-1"><span :class="dot_color" class="dot"></span>{{ message }}</span>
</template>

<script setup>
const props = defineProps({
  message: { type: String, required: true },
  /* Choose the color from the array of color classes
  Here its 0 for blue, 1 for green and 2 for amber*/
  color_selection: { type: Number, default: 0 },
});

const colors = [
  "dot-blue", 'dot-green', 'dot-amber', 'dot-red'
];

const dot_color = colors[props.color_selection] || 'dot-blue';
</script>

<style lang="css" scoped>

.dot {
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: rgb(var(--dot-color));
	box-shadow:
		0 0 4px rgba(var(--dot-color), 1),
		0 0 8px rgba(var(--dot-color), 0.95),
		0 0 16px rgba(var(--dot-color), 0.7);
}

.dot-blue { --dot-color: 59, 130, 246; }
.dot-green { --dot-color: 34, 197, 94; }
.dot-amber { --dot-color: 245, 158, 11; }
.dot-red { --dot-color: 239, 68, 68; }

</style>
