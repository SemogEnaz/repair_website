<template>
  <div class="flex flex-col gap-2 text-center mt-6">

      <p class="tech-eyebrow">Submit your repair details</p>
      <p class="tech-soft">Enter your details and I'll message you shortly to confirm price and arrange repair.</p>

      <!-- Input feilds for phone number and email-->
      <div class="flex flex-col sm:flex-row gap-4">
        <input v-model="phone" type="tel" placeholder="Your phone number 04..." class="w-full px-3 py-2 border rounded-md bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input v-model="email" type="email" placeholder="(Optional) Your email address" class="w-full px-3 py-2 border rounded-md bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

    </div>

    <!-- Submit button -->
    <button class="tech-button" @click="handleSubmit">Send My Repair Details</button>

</template>

<script setup lang="js">
import { ref } from 'vue';
const { quote, Alert } = defineProps(['quote', 'Alert']);


// Customer contact details
const phone = ref('');
const email = ref('');

async function handleSubmit() {
  if (!phone.value && !email.value) {
    Alert('Please enter a phone number or an email so I can contact you for further details. Thank you!')
    return
  }

  // Optional: very light validation
  if (phone.value && phone.value.length < 8) {
    Alert('Please enter a valid phone number.')
    return
  }

  if (email.value && !email.value.includes('@')) {
    Alert('Please enter a valid email address.')
    return
  }

  // Switch case with 

  // Ready to connect to backend later
  const payload = {
    model: quote.value.model,
    services: quote.services.filter((_, i) => quote.value.selectedServices[i]),
    price: quote.value.price,
    phone: phone.value,
    email: email.value,
  }

  const url = `${import.meta.env.VITE_API_URL}`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "supersecret123"
    },
    body: JSON.stringify(payload)
  });

  console.log('Form submitted:', payload)

  Alert("Thanks! I'll message you shortly to confirm details and arrange a time.")
};

</script>
