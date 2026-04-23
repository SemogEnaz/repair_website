<template>
  <div class="flex flex-col">

    <header class="px-3 pt-4 pb-2 sm:px-5">
      <div class="dark-blue rounded-xl p-4 sm:p-6 flex flex-col items-center gap-4">

        <!-- Title -->
        <h1 class="text-2xl sm:text-5xl font-bold text-center leading-tight">
          iPhone Repair Clayton
        </h1>

        <!-- Address -->
        <p
          class="cursor-pointer text-sm sm:text-base text-center hover:text-blue-400 transition"
          @click="copyAddress"
        >
          📍 2 Greenfield Drive, Clayton, Victoria
        </p>

        <!-- Nav buttons -->
        <div class="flex flex-col sm:flex-row w-full gap-3">
          <RouterLink to="/" class="blue button-shape w-full text-center">Home</RouterLink>
          <RouterLink to="/contact" class="blue button-shape w-full text-center">Contact</RouterLink>
          <RouterLink to="/calculator" class="blue button-shape w-full text-center">Quote Price</RouterLink>
          <RouterLink to="/about" class="blue button-shape w-full text-center">About</RouterLink>
        </div>

      </div>
    </header>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'

function copyAddress() {
  const address = "2 Greenfeild Drive, Clayton, Victoria";
  navigator.clipboard.writeText(address);
  alert("Address copied to clipboard!");
}
</script>

<style scoped>
header {
  padding: 20px;
  padding-bottom: 10px;
}

.button-shape {
  padding: 10px 15px;
  border-radius: 8px;
  color: white;
  text-align: center;
}

</style>
