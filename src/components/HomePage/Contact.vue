<template>
    <section class="tech-panel hero !m-[20px_0]" id="contactLinks">
      <p class="tech-eyebrow">Book a repair</p>
      <h2>Tell us what happened</h2>
      <p class="tech-muted">
        Send through your iPhone model, the issue, and your preferred repair time. We will confirm the best option for you.
      </p>

      <div class="flex flex-col items-center gap-3 mt-6 w-full">

        <!-- Top row (stack on mobile, side-by-side on desktop) -->
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-2/3">
          <button class="tech-button whatsapp-btn w-full" @click="openWhatsApp">💬 WhatsApp</button>
          <button class="tech-button messenger-btn w-full" @click="openMessenger">💬 Messenger</button>
        </div>

        <!-- Full width action -->
        <button class="tech-button secondary w-full sm:w-2/3" @click="copyPhoneNumber">📞 Copy Phone Number</button>

      </div>

    </section>

    <Alert ref="alertRef" />

</template>

<script setup>
import Alert from '../Alert.vue';
import { ref } from 'vue';

const alertRef = ref(null);

function copyPhoneNumber() {
  const phoneNumber = "0411969004"
  navigator.clipboard.writeText(phoneNumber)

  alertRef.value.trigger("Phone number copied to clipboard!");
}

const openWhatsApp = () => {
  const phone = "61431933409"; // your number (no +, no spaces)
  const message = encodeURIComponent(
    "Hi, I'd like to enquire about an iPhone repair."
  );

  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, "_blank");
};

const openMessenger = () => {
  window.location.href =
    "https://m.me/iphonerepairclayton?text=Hi%2C%20I%20need%20a%20repair.%20iPhone%20model%3A%20___%20Issue%3A%20___";
};
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

.page-shell {
  padding: 20px;
}

.hero,
.card {
  padding: 28px 24px;
}

.hero {
  text-align: center;
}

h2 {
  margin-top: 4px;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

h3 {
  margin-top: 4px;
  font-size: 1.35rem;
  font-weight: 800;
}

</style>
