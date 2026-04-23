import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/swiss-style.css'
import './styles/psyche.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
