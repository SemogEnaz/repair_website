<template>
  <div class="flex flex-col pb-20 sm:pb-0">
    <header class="px-3 pt-4 pb-2 sm:px-5">
      <div class="relative tech-panel app-header p-4 sm:p-6 flex flex-col items-center gap-4">

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

        <!-- Nav buttons for desktop-->
        <div class="hidden sm:flex w-full gap-3">
          <RouterLink to="/" class="tech-button button-shape w-full text-center" active-class="secondary">Home</RouterLink>
          <RouterLink to="/contact" class="tech-button button-shape w-full text-center" active-class="secondary">Contact</RouterLink>
          <RouterLink to="/calculator" class="tech-button button-shape w-full text-center" active-class="secondary">Quote Price</RouterLink>
          <RouterLink to="/about" class="tech-button button-shape w-full text-center" active-class="secondary">About</RouterLink>
        </div>

      </div>
    </header>

    <RouterView />

      <!-- Mobile bottom nav -->
      <div class="sm:hidden fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-700 z-50">

        <div class="flex justify-around items-center py-2">

          <RouterLink to="/" class="nav-item text-3xl" active-class="nav-active">
            🏠<span class="text-xl">Home</span></RouterLink>
          <RouterLink to="/contact" class="nav-item text-3xl" active-class="nav-active">
            💬<span class="text-xl">Contact</span></RouterLink>
          <RouterLink to="/calculator" class="nav-item text-3xl" active-class="nav-active">
            💰<span class="text-xl">Quote</span></RouterLink>
          <RouterLink to="/about" class="nav-item text-3xl" active-class="nav-active">
            ℹ️<span class="text-xl">About</span></RouterLink>

        </div>
      </div>

  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';

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

/* Mobile nav styles */

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #94a3b8; /* muted */
  padding: 6px 10px;
  border-radius: 10px;
  transition: all 0.2s ease;
}

/* ACTIVE STATE */
.nav-active {
  color: #60a5fa; /* blue highlight */
  background: rgba(59, 130, 246, 0.12);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.25);
  transform: translateY(-1px);
  font-weight: bold;
}

</style>
