import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import { router } from './router'
import './style.css'
import App from './App.vue'

registerSW({ immediate: true })

createApp(App).use(router).mount('#app')
