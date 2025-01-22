import './assets/main.css'

import { createApp, ref, computed } from 'vue'
import App from './App.vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase.js'
import Landing from './components/Landing.vue'
import Login from './components/Login.vue'
import ListaTareas from './components/ListaTareas.vue'

const routes = {
  '/': Landing,
  '/login': Login,
  '/tareas': ListaTareas,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || Landing
})

//createApp(App).mount('#app')
const app = createApp(App);
app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })

  
  app.provide('currentView', currentView);
  
  app.mount('#app');



/*
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase.js'
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: HomeView },
  { path: '/recordatorios', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  console.log("Salta beforeEach")
  if (to.fullPath=="/SoloUsuaiorsRegistrados")
    reutrn flase;
  else
    return true;
})

//createApp(App).mount('#app')
const app = createApp(App);
app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })
  
  app.mount('#app');
*/
