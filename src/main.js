import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadClarity } from './utils/clarity'
import { recordIP } from './utils/record_ip'

if (loadClarity()) recordIP();

const app = createApp(App)

app.use(router)

app.mount('#app')
