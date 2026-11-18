<template>
  <form class="flex flex-col gap-3" @submit.prevent="handleSubmit" :aria-busy="isSubmitting" novalidate>
    <div class="flex flex-col gap-2 text-center">

      <p class="tech-eyebrow">Submit your repair details</p>

      <!-- Input fields for phone number and email-->
      <div class="flex flex-col sm:flex-row gap-4">
        <input
          id="quote-phone"
          v-model="phone"
          :disabled="isSubmitting"
          type="tel"
          aria-label="Your phone number"
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
    <button class="tech-button disabled:opacity-60 disabled:cursor-wait" type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Sending…' : 'Send My Repair Details' }}
    </button>
    <p v-if="statusMessage" role="status" class="text-sm text-center" :class="hasError ? 'text-red-200' : 'tech-muted'">
      {{ statusMessage }}
    </p>
    <a v-if="whatsappUrl && !isSubmitting" :href="whatsappUrl" target="_blank" rel="noopener noreferrer"
      class="tech-button secondary text-center px-4 py-3" @click="trackContact('whatsapp')">
      Send this estimate via WhatsApp
    </a>
    <p v-if="whatsappUrl && !isSubmitting" class="tech-soft text-xs text-center">
      Your model, repairs, parts quality and estimate will be filled in. Review the message before sending.
    </p>
  </form>

</template>

<script setup lang="js">
import { ref, computed, watch } from 'vue';
import { sanitizePhoneInput, validatePhoneNumber } from '@/utils/phoneValidation.js';
import { trackQuoteSuccess, trackContact } from '@/utils/analytics.js';
import { buildRepairRequest, getRepairWhatsAppUrl } from '@/utils/repairQuote.js';

const { quote, Alert } = defineProps(['quote', 'Alert']);
const emit = defineEmits(['submitting']);


// Customer contact details
const phone = ref('');
const phoneError = ref('');
const isSubmitting = ref(false);
const statusMessage = ref('');
const hasError = ref(false);
const whatsappUrl = computed(() => getRepairWhatsAppUrl(quote));

watch([whatsappUrl, phone], () => {
  if (!isSubmitting.value) {
    statusMessage.value = ''
    hasError.value = false
  }
})

const failureMessage = "We couldn't confirm your request. Please use the WhatsApp button below or call 0411 969 004 to check before resubmitting.";

function showFailureAlert() {
  statusMessage.value = failureMessage
  hasError.value = true
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
  if (isSubmitting.value) return
  statusMessage.value = ''
  hasError.value = false
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

  // Snapshot the actual estimate, including parts quality, before sending.
  const payload = buildRepairRequest(quote, phoneValidation.phone)

  const url = import.meta.env.VITE_API_URL;

  if (!url) {
    showFailureAlert()
    return
  }

  isSubmitting.value = true
  emit('submitting', true)
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "supersecret123"
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    let result = null;

    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok || result?.success !== true) {
      if (response.status === 400 && result?.error) {
        statusMessage.value = result.error
        hasError.value = true
        Alert(result.error)
        return
      }

      showFailureAlert()
      return
    }

    trackQuoteSuccess()
    statusMessage.value = "Thanks! I'll message you to confirm the repair details and arrange a time. Please wait for confirmation before visiting."
    Alert(statusMessage.value)
  } catch (err) {
    console.error('Repair quote submission failed:', err)
    showFailureAlert()
  } finally {
    clearTimeout(timeout)
    isSubmitting.value = false
    emit('submitting', false)
  }
};

</script>
