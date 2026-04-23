<template>
  <section id="quote" class="calculator flex flex-col items-center gap-6">

      <h1 class="text-4xl">Calculate Repair Price Estimate</h1>

      <!-- Title for Columns -->
      <div class="flex w-full gap-4 justify-evenly bg-blue-950 rounded-lg p-4">
        <p class="w-1/3">iPhone Model</p><span>|</span>
        <p class="w-1/3">Services</p><span>|</span>
        <p class="w-1/3">Price & Time</p>
      </div>

      <div class="flex w-full gap-4 items-start bg-blue-950 rounded-lg p-4">

        <!-- iPhone Model dropdown, taken from codepen -->
        <!-- https://codepen.io/editor/samplereeeeee/pen/019cff2f-d572-702e-a573-a54e0a652b47 -->
        <div class="dropdown flex flex-col items-center w-1/3">

          <button class="dropdown-btn hover:border-blue-500 border-3 border-transparent"
            @click="toggleDropdown">{{ model ? `iPhone ${model}` : 'Select Model' }}<span class="caret"></span>
          </button>

          <div id="menu" class="dropdown-menu">
            <a href="#" @click.prevent="selectModel('11')">iPhone 11</a>
            <a href="#" @click.prevent="selectModel('12')">iPhone 12</a>
            <a href="#" @click.prevent="selectModel('13')">iPhone 13</a>
          </div>

        </div>

        <!-- Services buttons -->
        <div class="flex flex-col flex flex-col items-center w-1/3 gap-2">

          <button
            v-for="option in options"
            :key="option.value"
            @click="() => selectedServices[option.position] = !selectedServices[option.position]"
            :class="[
              'hover:border-blue-500 border-3 border-transparent',
              selectedServices[option.position] ? 'bg-blue-500 text-white font-bold' : ''
            ]">
            {{ option.label }}
          </button>

        </div>

        <!-- Price & Time Display -->
        <div class="rounded-lg border-3 border-blue-500 text-white w-1/3 self-stretch flex flex-col justify-evenly py-4">

          <p class="sm:text-6xl text-2xl">${{ calculatePrice() }}</p>
          <p class="text-sm text-center">Time: {{ calculateTime() < 60 ? `${calculateTime()} mins` : `${Math.floor(calculateTime() / 60)} hrs ${calculateTime() % 60} mins` }}</p>

        </div>

      </div>

    </section>
</template>

<script setup>
import { ref, computed } from 'vue';

//Please update with accurate prices later, these are just placeholders for now
const screenPrices = {
  '11': 20,
  '12': 20,
  '13': 25
};

const batteryPrices = {
  '11': 15,
  '12': 15,
  '13': 15
};

const backGlassPrices = {
  '11': 50,
  '12': 50,
  '13': 50
};

const chargePortPrices = {
  '11': 10,
  '12': 15,
  '13': 15
};

const timeEstimates = {
  'screen': 20,
  'battery': 20,
  'back glass': 120,
  'charge port': 40
};

const model = ref(''); // This will hold the selected iPhone model

// If we had more services, we could add more options here
const services = [
  'screen', 'battery', 'back glass', 'charge port'
];

// This will track which options are selected
const selectedServices = ref(
  services.map(() => false)
);

// Creating options for the buttons based on services
// { Battery, battery, 0 }, { Screen, screen, 1 }, { Back, back, 2 }
const options = computed(() => {
  return services.map((service, index) => ({
    label: service.charAt(0).toUpperCase() + service.slice(1),
    value: service,
    position: index,
  }))
});

function toggleDropdown() {
  const dropdown = document.querySelector(".dropdown");
  dropdown.classList.toggle("open");
}

document.addEventListener("click", (e) => {
  const dropdown = document.querySelector(".dropdown");
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove("open");
  }
});

function selectModel(selectedModel) {
  model.value = selectedModel;
  toggleDropdown();
};

function calculatePrice() {
  let profitMargin = 50;

  // Add price for each selected service
  selectedServices.value.forEach((isSelected, index) => {
    if (isSelected) {

      if (!model.value) {
        alert('Please select an iPhone model first!');
        selectedServices.value[index] = false;
        return;
      };

      switch (index) {
        case 0: // Screen
          profitMargin += screenPrices[model.value];
          break;
        case 1: // Battery
          profitMargin += batteryPrices[model.value];
          break;
        case 2: // Back Glass
          profitMargin += backGlassPrices[model.value] + 20; // Adding extra for the time it takes
          break;
        case 3: // Charge Port
          profitMargin += chargePortPrices[model.value] + 20;
          break;
      }
    }
  });

  return profitMargin == 50 ? 0 : profitMargin;
}

function calculateTime() {
  let totalTime = 0;

  const selected = services.filter((_, index) => selectedServices.value[index]);

  const hasScreen = selected.includes('screen');
  const hasBackGlass = selected.includes('back glass');

  selected.forEach(service => {
    // skip battery if screen is selected, since we can do it at the same time
    if (service === 'battery' && hasScreen) return;

    // skip back glass if screen is selected
    if (service === 'charge port' && hasBackGlass) return;

    totalTime += timeEstimates[service]
  });

  return totalTime;
}

</script>

<style scoped>
/* CALCULATOR */
.calculator {
  margin-top: 30px;
  background: #111;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
}

button {
  padding: 5px;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
}

/* Dropdown styles */

/* Container */
.dropdown {
  position: relative;
}

/* Button */
.dropdown-btn {
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.caret {
  width: 6px;
  height: 6px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
  transition: transform 0.25s ease;
}

.dropdown.open .caret {
  transform: rotate(225deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  min-width: 120px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  padding: 8px 0;

  opacity: 0;
  pointer-events: none;

  transition: opacity 0.25s ease, transform 0.25s ease;
}

.dropdown.open .dropdown-menu {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
  pointer-events: auto;
}

.dropdown-menu a {
  display: block;
  padding: 10px 14px;
  text-decoration: none;
  color: #333;
  font-size: 14px;
  transition: background 0.2s ease;
}

.dropdown-menu a:hover {
  background: #f0f4ff;
}
</style>
