<template>
    <button class="tech-button" @click="handleSubmit">Send My Repair Details</button>
</template>

<script setup lang="js">
import { sendFacebookMessage } from '../../../../utils/message';
const { quote, Alert } = defineProps(['quote', 'Alert']);

function getSelectedServices() {
  return quote.services.filter((_, index) => quote.selectedServices[index]);
}

function buildFacebookMessage() {
  const selectedServices = getSelectedServices().join(', ');

  return `Hi, I would like to get my iPhone ${quote.model} repaired.

Services needed: ${selectedServices}
Estimated price: $${quote.price}

Thank you.`;
}

function isValidQuote() {
  if (!quote.model) {
    Alert('Please select an iPhone model.');
    return false;
  }

  const hasSelectedService = quote.selectedServices.some(Boolean);

  if (!hasSelectedService) {
    Alert('Please select at least one repair service.');
    return false;
  }

  return true;
}

async function handleSubmit() {

	if (!isValidQuote()) return

	sendFacebookMessage(buildFacebookMessage());

	console.log('Form submitted:', quote)

	Alert("Thanks! I'll message you shortly to confirm details and arrange a time.")
};

</script>
