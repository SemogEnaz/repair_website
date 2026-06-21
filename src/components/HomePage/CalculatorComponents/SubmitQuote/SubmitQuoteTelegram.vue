<template>
  <div class="flex flex-col gap-2 text-center">

      <p class="tech-eyebrow">Submit your repair details</p>

      <!-- Input feilds for phone number and email-->
      <div class="flex flex-col sm:flex-row gap-4">
        <input v-model="phone" type="tel" placeholder="Your phone number 04..." class="w-full px-3 py-2 border rounded-md bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
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

const failureMessage = 'Sorry, the quote system is down and your repair quote was not submitted. Please contact me directly using the WhatsApp, Messenger, or phone resources on the home page.';

function showFailureAlert() {
  Alert(failureMessage, { variant: 'failure' })
}

async function handleSubmit() {
  if (!phone.value) {
    Alert('Please enter a phone number so I can contact you for further details. Thank you!')
    return
  }

  if (!quote.model) {
    Alert('Please select an iPhone model.')
    return
  }

  if (!quote.selectedServices.some(Boolean)) {
    Alert('Please select at least one repair service.')
    return
  }

  // Ready to connect to backend later
  const payload = {
    model: quote.model,
    services: quote.services.filter((_, i) => quote.selectedServices[i]),
    price: quote.price,
    phone: phone.value,
  }

  const url = import.meta.env.VITE_API_URL;

  if (!url) {
    showFailureAlert()
    return
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "supersecret123"
      },
      body: JSON.stringify(payload)
    });

    let result = null;

    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok || result?.success !== true) {
      showFailureAlert()
      return
    }
  } catch (err) {
    console.error('Repair quote submission failed:', err)
    showFailureAlert()
    return
  }

  console.log('Form submitted:', payload)

  Alert("Thanks! I'll message you shortly to confirm details and arrange a time.")
};

</script>
