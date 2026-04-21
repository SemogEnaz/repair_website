<template>
  <section id="quote" class="calculator flex flex-col items-center">

      <h2>Get Your Repair Price in Seconds</h2>

      <div class="flex w-full gap-4 items-start">
        <!-- iPhone Model dropdown, taken from codepen -->
        <!-- https://codepen.io/editor/samplereeeeee/pen/019cff2f-d572-702e-a573-a54e0a652b47 -->
        <div class="dropdown flex flex-col items-center w-1/3">

          <button class="dropdown-btn w-full btn hover:border-blue-500 border-3 border-transparent !m-0" @click="toggleDropdown">
            User Menu <span class="caret"></span>
          </button>

          <div id="menu" class="dropdown-menu">
            <a href="#">iPhone 11</a>
            <a href="#">iPhone 12</a>
            <a href="#">iPhone 13</a>
          </div>

        </div>

        <!-- Services buttons -->
        <div class="flex flex-col flex flex-col items-center w-1/3 gap-1">
          <button
            v-for="option in options"
            :key="option.value"
            @click="() => selectedOptions[option.position] = !selectedOptions[option.position]"
            :class="[
              'w-full btn hover:border-blue-500 border-3 border-transparent !m-0',
              selectedOptions[option.position] ? 'btn-primary' : ''
            ]"
          >
            {{ option.label }}
          </button>
        </div>

        <div class="result" v-if="price">
          Estimated Price: ${{ price }} <br />
          Time: ~30–45 mins
        </div>

        <button href="#contact" class="btn btn-primary w-1/3 border-transparent border-3 !m-0">Book This Repair</button>
      </div>

    </section>
</template>

<script setup>
import { ref, computed } from 'vue';

// state
const selectedModel = ref('')
const selectedIssue = ref('')

// If we had more services, we could add more options here
const services = [
  'screen', 'battery', 'back'
]

// This will track which options are selected
const selectedOptions = ref(
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

// links (replace these)`

// pricing logic
const price = computed(() => {
  if (!selectedModel.value || !selectedIssue.value) return null

  if (selectedIssue.value === 'screen') {
    if (selectedModel.value === '11') return 89
    if (selectedModel.value === '12') return 109
    if (selectedModel.value === '13') return 129
  }

  if (selectedIssue.value === 'battery') {
    if (selectedModel.value === '11') return 59
    if (selectedModel.value === '12') return 69
    if (selectedModel.value === '13') return 79
  }

  return null
})
</script>

<style scoped>
/* CALCULATOR */
.calculator {
  margin-top: 60px;
  background: #111;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
}

.result {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #0f0;
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
