import './assets/base.css'
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VeeValidatorPlugin from './includes/validator'
import { auth } from './includes/firebase'

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidatorPlugin)

    app.mount('#app')
  }
})
