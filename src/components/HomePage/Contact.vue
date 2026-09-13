<template>
    <section class="tech-panel hero my-6! px-4 py-8 text-center flex flex-col gap-3" id="contactLinks">
      <p class="tech-eyebrow">Book a repair</p>
      <h2 class="text-3xl font-bold">Contact Us</h2>
      <p class="tech-muted">
        Send through your iPhone model, the issue, and your preferred repair time. We will confirm the best option for you.
      </p>

      <div class="flex flex-col items-center gap-3 w-full">

        <!-- Top row (stack on mobile, side-by-side on desktop) -->
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-2/3">
          <a :href="business.whatsapp" target="_blank" rel="noopener noreferrer" class="tech-button whatsapp-btn w-full px-5 py-3" @click="trackContact('whatsapp')">💬 WhatsApp</a>
          <a :href="business.facebook" target="_blank" rel="noopener noreferrer" class="tech-button messenger-btn w-full px-5 py-3" @click="trackContact('facebook')">💬 Facebook</a>
        </div>

        <!-- Full width action -->
        <a :href="`tel:${business.phone}`" class="tech-button secondary w-full sm:w-2/3 px-5 py-3" @click="trackContact('phone')">📞 Call {{ business.displayPhone }}</a>

      </div>

    </section>


</template>

<script setup>
import { business } from '@/data/business.js';
import { trackContact } from '@/utils/analytics.js';
</script>

<style scoped>

.whatsapp-btn {
  background: linear-gradient(to bottom, #25D366, #128C7E);
  box-shadow: 0 8px 20px rgba(37, 211, 102, 0.2);
  border: none;
}

.whatsapp-btn:hover {
border: none;
}

/* Messenger = blue → purple blend */
.messenger-btn {
  background: linear-gradient(to bottom, #0099FF, #8b5cf6);
  box-shadow: 0 8px 20px rgba(0, 153, 255, 0.2);
  border: none;
}

.messenger-btn:hover {
  border: none;
}

</style>
