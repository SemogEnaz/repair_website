<template>
  <main class="page-shell">
    <section class="tech-panel hero">
      <p class="tech-eyebrow">Book a repair</p>
      <h2>Tell us what happened</h2>
      <p class="tech-muted">
        Send through your iPhone model, the issue, and your preferred repair time. We will confirm the best option for you.
      </p>

      <div class="flex flex-col items-center gap-3 mt-6 w-full" id="contactLinks">

        <!-- Top row (stack on mobile, side-by-side on desktop) -->
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-2/3">
          <button class="tech-button whatsapp-btn w-full" @click="openWhatsApp">💬 WhatsApp</button>
          <button class="tech-button messenger-btn w-full" @click="openMessenger">💬 Messenger</button>
        </div>

        <!-- Full width action -->
        <button class="tech-button secondary w-full sm:w-2/3" @click="copyPhoneNumber">📞 Copy Phone Number</button>

      </div>

    </section>

    <section class="flex flex-col sm:flex-row gap-3 mt-7">
      <article class="tech-card card sm:w-1/2">
        <p class="tech-eyebrow">Location</p>
        <h3>Clayton, Victoria</h3>
        <p class="tech-muted">Based near Clayton Station, with easy parking on-site for quick drop-offs & pickups.</p>
      </article>

      <article class="tech-card card sm:w-1/2">
        <p class="tech-eyebrow">Response</p>
        <h3>Same-day replies</h3>
        <p class="tech-muted">For common screen and battery repairs, we can usually quote from one message.</p>
      </article>
    </section>
  </main>
</template>

<script setup>

function copyPhoneNumber() {
  const phoneNumber = "0411969004"
  navigator.clipboard.writeText(phoneNumber)
  alert("Phone number copied to clipboard!")
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
window.open("https://www.facebook.com/messages/t/zane.gomes.212064", "_blank");};

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
