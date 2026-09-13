<template>
  <div class="flex flex-col pb-20 sm:pb-0">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <header class="px-3 pt-4 pb-2 sm:px-5">
      <div class="relative tech-panel app-header px-4 py-8 sm:p-6 flex flex-col items-center gap-3">

        <!-- Title -->
        <p class="tech-eyebrow">iPhone repairs by appointment</p>
        <RouterLink to="/" class="text-3xl sm:text-5xl font-bold text-center leading-tight tracking-tight">
          {{ business.name }}
        </RouterLink>

        <div class="flex flex-col gap-0 sm:mb-2">
          <!-- Address & Phone Number -->
          <div class="flex flex-row gap-3">
            <a :href="business.directions" target="_blank" rel="noopener noreferrer" class="tech-muted text-xs sm:text-base text-center hover:text-blue-300 transition" @click="trackContact('directions')">2 Greenfield Drive, Clayton VIC 3168</a>
            <a :href="`tel:${business.phone}`" class="tech-muted text-xs sm:text-base text-center hover:text-blue-300 transition" @click="trackContact('phone')">{{ business.displayPhone }}</a>
          </div>
        </div>

        <!-- Nav buttons for desktop-->
        <div class="hidden sm:flex w-full gap-3 items-center justify-center">
          <RouterLink v-for="page in pages" :key="page[0]" :to="page[0]" class="nav-item button-shape w-full text-center" active-class="nav-active">
            {{ page[1] }}</RouterLink>
        </div>

      </div>
    </header>

    <Breadcrumbs />
    <RouterView />
    <footer class="mx-5 mb-6 p-5 border-t border-slate-700 text-sm tech-soft">
      <p class="font-bold">{{ business.name }}</p>
      <p class="mt-2">{{ business.hours }} · By appointment</p>
      <nav class="flex flex-wrap gap-x-5 gap-y-3 mt-4" aria-label="Footer">
        <RouterLink to="/repair-prices" class="underline">Repair prices</RouterLink>
        <RouterLink to="/contact" class="underline">Contact &amp; directions</RouterLink>
        <RouterLink to="/about" class="underline">About &amp; warranty</RouterLink>
        <a :href="business.googleProfile" target="_blank" rel="noopener noreferrer" class="underline">Google reviews</a>
      </nav>
    </footer>

      <!-- Mobile bottom nav -->
      <div class="sm:hidden fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-700 z-50">

        <div class="flex justify-around items-center pt-2">
          <RouterLink v-for="page in pages" :key="page[0]" :to="page[0]" class="nav-item text-4xl" active-class="nav-active">
            {{ page[2] }}<span class="text-base">{{ page[1] }}</span></RouterLink>
        </div>

      </div>

    </div>


</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Breadcrumbs from './components/Breadcrumbs.vue';
import { business } from './data/business.js';
import { trackContact } from './utils/analytics.js';

const pages = [
  ['/', 'Home', '🛠️'],
  ['/repair-prices', 'Prices', '💲'],
  ['/contact', 'Contact', '📞'],
  ['/buy', 'Buy', '📱'],
];

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
