<template>
  <section class="tech-panel hero-panel text-center px-4 py-8 sm:p-10 m-5">

    <p class="tech-eyebrow">Buy The Perfect Second hand iPhone</p>
    <h2 class="mt-2 text-2xl sm:text-4xl font-bold leading-tight tracking-tight">Browse Refurbished iPhones</h2>

    <div class="mt-8 flex justify-center">
      <a
        href="https://www.facebook.com/marketplace/profile/100077201046828/"
        target="_blank"
        class="tech-button px-5 py-3"
      >
        View Marketplace Listings
      </a>
    </div>

    <p class="tech-muted mt-8">View currently available iPhones on our Marketplace profile.</p>

    <p class="tech-soft mt-6 text-xs sm:text-sm flex flex-wrap justify-center items-center sm:gap-x-4 gap-x-2 gap-y-2">
      <Dot message="Updated regularly" :color_selection="1"></Dot>
      <Dot message="Pickup Clayton" :color_selection="1"></Dot>
      <Dot message="Trade-ins welcome" :color_selection="1"></Dot>
    </p>
  </section>
</template>

<script setup lang="js">
import Dot from '@/components/Dot.vue';
</script>
