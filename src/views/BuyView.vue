<template>
  <section class="tech-panel hero-panel text-center px-4 py-8 sm:p-10 m-5">

    <p class="tech-eyebrow">Verified devices</p>

    <h1 class="mt-3 text-2xl sm:text-4xl font-bold leading-tight tracking-tight">Browse Refurbished iPhones</h1>

    <div class="mt-8 flex justify-center">
      <a
        href="https://www.facebook.com/marketplace/profile/100077201046828/"
        target="_blank"
        class="tech-button px-5 py-3"
      >
        View Marketplace Listings
      </a>
    </div>

    <p class="tech-muted mt-8">
      View currently available iPhones, updated listings, battery health details,
      and local pickup options directly on our Marketplace profile.
    </p>


    <p class="tech-soft text-xs mt-4 flex gap-2 justify-center">
      <Dot message="Devices updated regularly"></Dot>
      <Dot message="Local pickup in Clayton"></Dot>
      <Dot message="Trade-ins welcome"></Dot>
    </p>
  </section>
</template>

<script setup lang="js">
import Dot from '@/components/Dot.vue';
</script>
