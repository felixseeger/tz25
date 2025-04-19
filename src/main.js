import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import routes from './router/index.js'
import store from './store'

// Import utilities
import gsap from './utils/gsap'
import { initFontLoading } from './utils/fontLoader'

// Import directives
import { lazyLoad, animateOnScroll } from './directives'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

// Register global directives
app.directive('lazy-load', lazyLoad)
app.directive('animate-on-scroll', animateOnScroll)

// Use router and store
app.use(router)
app.use(store)

// Initialize font loading
initFontLoading()

// Mount the app
app.mount('#app')
