<template>
  <section id="quote" class="tech-panel calculator flex flex-col items-center gap-6">

    <p class="tech-eyebrow">Instant estimate</p>
    <h1 class="text-2xl sm:text-4xl font-bold tracking-tight">
      Calculate Repair Price Estimate
    </h1>

    <!-- Column Titles (desktop only) -->
    <div class="tech-card hidden sm:flex w-full gap-4 justify-evenly p-4 text-sm">
      <p class="w-1/3 text-center">iPhone Model</p>
      <p class="w-1/3 text-center">Services</p>
      <p class="w-1/3 text-center">Price & Time</p>
    </div>

    <!-- Main Content -->
    <div class="tech-card flex flex-col sm:flex-row w-full gap-4 p-4">

      <!-- Calculator and Submission form-->
      <div class="flex flex-col w-full gap-4">

        <!-- Just Calculator -->
        <div class="flex flex-col sm:flex-row w-full gap-4">

          <!-- MODEL -->
          <div class="relative flex flex-col w-full sm:w-1/3 self-start">
            <!-- Button -->
            <button
              class="selector-button w-full py-2 flex items-center justify-center gap-2"
              @click="toggleDropdown"
            >
              {{ model ? `iPhone ${model}` : 'Select Model' }}
              <span class="caret" :class="{ open: isOpen }"></span>
            </button>

            <!-- Dropdown -->
            <div
              v-if="isOpen"
              class="dropdown absolute top-full left-0 mt-2 w-full rounded-lg shadow-lg z-50"
            >
              <div class="dropdown-option p-3 cursor-pointer" @click="selectModel('11')">iPhone 11</div>
              <div class="dropdown-option p-3 cursor-pointer" @click="selectModel('12')">iPhone 12</div>
              <div class="dropdown-option p-3 cursor-pointer" @click="selectModel('13')">iPhone 13</div>
            </div>

          </div>

          <!-- SERVICES -->
          <div class="flex flex-col items-center w-full sm:w-1/3 gap-2">
            <button
              v-for="option in options"
              :key="option.value"
              @click="toggleService(option.position)"
              :class="[
                'service-button w-full py-2',
                selectedServices[option.position]
                  ? 'selected font-bold'
                  : ''
              ]"
            >
              {{ option.label }}
            </button>
          </div>

          <!-- PRICE -->
          <div class="price-card w-full sm:w-1/3 flex flex-col justify-between py-4 px-2">

            <p class="text-center font-bold text-3xl sm:text-6xl">
              ${{ calculatePrice() }}
            </p>

            <p class="tech-muted text-sm text-center">
              Time: {{ formattedTime }}
            </p>

          </div>

        </div>

        <!-- Selected services summary -->
        <p class="text-center" :class="{ hidden: !model || !selectedServicesText }">
          Repair my iPhone {{ model }} {{ selectedServicesText }}
        </p>

        <!-- Contact form information -->
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

      </div>

    </div>

    <div>
      <p class="tech-soft text-xs text-center">
        *Further communications may take place over facebook, whatsapp or other messaging platforms. This form is just an initial estimate and isn't a binding quote.
      </p>
    </div>

  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// ---------------- DATA ----------------

const model = ref('')
const isOpen = ref(false)

const services = ['screen', 'battery', 'back glass', 'charge port']

const selectedServices = ref(services.map(() => false))

const options = computed(() =>
  services.map((service, index) => ({
    label: service.charAt(0).toUpperCase() + service.slice(1),
    value: service,
    position: index,
  }))
)

const phone = ref('');
const email = ref('');

// ---------------- PRICING ----------------

const screenPrices = { '11': 20, '12': 20, '13': 25 }
const batteryPrices = { '11': 15, '12': 15, '13': 15 }
const backGlassPrices = { '11': 50, '12': 50, '13': 50 }
const chargePortPrices = { '11': 10, '12': 15, '13': 15 }

const timeEstimates = {
  'screen': 20,
  'battery': 20,
  'back glass': 120,
  'charge port': 40
}

// ---------------- ACTIONS ----------------

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectModel = (val) => {
  model.value = val
  isOpen.value = false
}

const toggleService = (index) => {
  if (!model.value) {
    alert('Please select an iPhone model first!')
    return
  }
  selectedServices.value[index] = !selectedServices.value[index]
}

// ---------------- LOGIC ----------------

function calculatePrice() {
  let total = 50

  selectedServices.value.forEach((isSelected, index) => {
    if (!isSelected) return

    switch (index) {
      case 0: total += screenPrices[model.value]; break
      case 1: total += batteryPrices[model.value]; break
      case 2: total += backGlassPrices[model.value] + 20; break
      case 3: total += chargePortPrices[model.value] + 20; break
    }
  })

  return total === 50 ? 0 : total
}

function calculateTime() {
  let total = 0

  const selected = services.filter((_, i) => selectedServices.value[i])
  const hasScreen = selected.includes('screen')

  for (const service of selected) {
    if (service === 'battery' && hasScreen) continue
    total += timeEstimates[service]
  }

  return total
};

// ---------------- FORMAT ----------------

const formattedTime = computed(() => {
  const t = calculateTime()

  if (t < 60) return `${t} mins`

  const h = Math.floor(t / 60)
  const m = t % 60

  return m ? `${h} hrs ${m} mins` : `${h} hrs`
});

const selectedServicesText = computed(() => {
  const selected = services.filter((_, i) => selectedServices.value[i])

  if (!selected.length) return ''

  return selected
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' + ')
});

async function handleSubmit() {
  if (!phone.value && !email.value) {
    alert('Please enter a phone number or an email so I can contact you for further details. Thank you!')
    return
  }

  // Optional: very light validation
  if (phone.value && phone.value.length < 8) {
    alert('Please enter a valid phone number.')
    return
  }

  if (email.value && !email.value.includes('@')) {
    alert('Please enter a valid email address.')
    return
  }

  // Ready to connect to backend later
  const payload = {
    model: model.value,
    services: services.filter((_, i) => selectedServices.value[i]),
    price: calculatePrice(),
    phone: phone.value,
    email: email.value,
  }

  const url = 'https://sendrepairrequest-lw6nnqoxeq-uc.a.run.app';

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model.value,
      services: payload.services,
      contact: {
        phone: payload.phone,
        email: payload.email
      }
    })
  });

  console.log('Form submitted:', payload)

  alert("Thanks! I'll message you shortly to confirm details and arrange a time.")
};
</script>

<style scoped>
.calculator {
  margin-top: 20px;
  padding: 20px;
  overflow: visible;
}

.selector-button,
.service-button {
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: var(--radius-md);
  background: var(--surface-3);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.selector-button:hover,
.service-button:hover {
  border-color: rgba(147, 197, 253, 0.42);
  transform: translateY(-1px);
}

.service-button.selected {
  border-color: rgba(191, 219, 254, 0.6);
  background: linear-gradient(135deg, var(--accent), #2563eb);
  box-shadow: var(--shadow-blue);
}

.dropdown {
  border: 1px solid rgba(147, 197, 253, 0.24);
  background: rgba(248, 250, 252, 0.96);
  color: #0f172a;
  overflow: hidden;
}

.dropdown-option {
  color: #0f172a;
}

.dropdown-option:hover {
  background: rgba(59, 130, 246, 0.12);
}

.price-card {
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-md);
  background:
    radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.22), transparent 58%),
    rgba(15, 23, 42, 0.62);
}

.caret {
  width: 6px;
  height: 6px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
  transition: transform 0.25s ease;
}

.caret.open {
  transform: rotate(225deg);
}
</style>
