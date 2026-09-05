<template>
  <form class="flex flex-col gap-3" @submit.prevent="handleSubmit" novalidate>
    <div class="flex flex-col gap-2 text-center">

      <p class="tech-eyebrow">Submit your repair details</p>

      <!-- Input fields for phone number and email-->
      <div class="flex flex-col sm:flex-row gap-4">
        <input
          id="quote-phone"
          v-model="phone"
          type="tel"
          inputmode="tel"
          autocomplete="tel"
          maxlength="32"
          placeholder="Your phone number 04..."
          :aria-invalid="phoneError ? 'true' : 'false'"
          aria-describedby="quote-phone-error"
          :class="[
            'w-full px-3 py-2 border rounded-md bg-slate-800/50 focus:outline-none focus:ring-2',
            phoneError ? 'border-red-400 focus:ring-red-400' : 'border-slate-600 focus:ring-blue-400'
          ]"
          @blur="validatePhoneField"
          @input="handlePhoneInput"
        />
      </div>

      <p v-if="phoneError" id="quote-phone-error" class="text-sm text-red-200 text-left">
        {{ phoneError }}
      </p>

    </div>

    <!-- Submit button -->
    <button class="tech-button" type="submit">Send My Repair Details</button>
  </form>

</template>

<script setup lang="js">
import { ref } from 'vue';
import { sanitizePhoneInput, validatePhoneNumber } from '@/utils/phoneValidation.js';

const { quote, Alert } = defineProps(['quote', 'Alert']);


// Customer contact details
const phone = ref('');
const phoneError = ref('');

const failureMessage = 'Sorry, the quote system is down and your repair quote was not submitted. Please contact me directly using the WhatsApp, Messenger, or phone resources on the home page.';

function showFailureAlert() {
  Alert(failureMessage, { variant: 'failure' })
}

function handlePhoneInput() {
  const sanitizedPhone = sanitizePhoneInput(phone.value);

  if (phone.value !== sanitizedPhone) {
    phone.value = sanitizedPhone;
  }

  if (phoneError.value) {
    validatePhoneField();
  }
}

function validatePhoneField() {
  const validation = validatePhoneNumber(phone.value);

  phoneError.value = validation.isValid ? '' : validation.message;

  return validation;
}

async function handleSubmit() {
  if (!quote.model) {
    Alert('Please select an iPhone model.')
    return
  }

  if (!quote.selectedServices.some(Boolean)) {
    Alert('Please select at least one repair service.')
    return
  }

  const phoneValidation = validatePhoneField();

  if (!phoneValidation.isValid) {
    Alert(phoneValidation.message)
    return
  }

  // Ready to connect to backend later
  const payload = {
    model: quote.model,
    services: quote.services.filter((_, i) => quote.selectedServices[i]),
    price: quote.price,
    phone: phoneValidation.phone,
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
      if (response.status === 400 && result?.error) {
        Alert(result.error)
        return
      }

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
