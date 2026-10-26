import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import { router } from './router'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import '@fortawesome/fontawesome-free/css/brands.min.css'
import './style.css'
import App from './App.vue'

registerSW({ immediate: true })

createApp(App).use(router).mount('#app')
