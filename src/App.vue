<template>
  <div class="flex flex-col">

    <header class="px-3 pt-4 pb-2 sm:px-5">
      <div class="tech-panel app-header p-4 sm:p-6 flex flex-col items-center gap-4">

        <!-- Title -->
        <p class="tech-eyebrow">On-site Apple repair</p>
        <h1 class="text-2xl sm:text-5xl font-bold text-center leading-tight tracking-tight">
          iPhone Repair Clayton
        </h1>

        <!-- Address -->
        <p
          class="tech-muted cursor-pointer text-sm sm:text-base text-center hover:text-blue-300 transition"
          @click="copyAddress"
        >
          2 Greenfield Drive, Clayton, Victoria
        </p>

        <!-- Nav buttons -->
        <div class="flex flex-col sm:flex-row w-full gap-3">
          <RouterLink to="/" class="tech-button button-shape w-full text-center">Home</RouterLink>
          <RouterLink to="/contact" class="tech-button button-shape w-full text-center">Contact</RouterLink>
          <RouterLink to="/calculator" class="tech-button button-shape w-full text-center">Quote Price</RouterLink>
          <RouterLink to="/about" class="tech-button button-shape w-full text-center">About</RouterLink>
        </div>

      </div>
    </header>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'

function copyAddress() {
  const address = "2 Greenfield Drive, Clayton, Victoria"
  navigator.clipboard.writeText(address)
  alert("Address copied to clipboard!")
}
</script>

<style scoped>
header {
  padding: 20px;
  padding-bottom: 10px;
}

.button-shape {
  padding: 10px 15px;
  text-align: center;
}

.app-header {
  overflow: hidden;
  position: relative;
}

.app-header::after {
  position: absolute;
  top: -80px;
  right: -80px;
  width: 190px;
  height: 190px;
  border-radius: 999px;
  background: rgba(96, 165, 250, 0.16);
  content: "";
  filter: blur(4px);
}

.app-header > * {
  position: relative;
  z-index: 1;
}

</style>
