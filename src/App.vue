<template>

  <div class="flex flex-col">
    <header>
      <div class="dark-blue rounded-lg p-[20px] flex flex-col items-center gap-3">

        <h1 class="text-6xl text-center">iPhone Repair Clayton</h1>
        <p class="pb-7 cursor-pointer" @click="copyAddress()"
          >📍 2 Greenfeild Drive, Clayton, Victoria</p>

        <div class="flex w-full items-center px-5 gap-4 justify-center">
          <RouterLink to="/" class="blue button-shape flex-1">Home</RouterLink>
          <RouterLink to="/contact" class="blue button-shape flex-1">Contact</RouterLink>
          <RouterLink to="/calculator" class="blue button-shape flex-1">Quote Price</RouterLink>
          <RouterLink to="/about" class="blue button-shape flex-1">About</RouterLink>
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
