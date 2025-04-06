import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import routes from './router/index.js'

// Import GSAP
import gsap from './utils/gsap'

// Import directives
import { lazyLoad } from './directives'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

// Register global directives
app.directive('lazy-load', lazyLoad)

app.use(router)
app.mount('#app')
