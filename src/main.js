import { createApp } from 'vue'
import App from './App.vue';
import createStore from "./store";
import { createRouter, createWebHistory } from 'vue-router';
const store = createStore();

import Home from './pages/Home.vue'
import Tasks from './pages/Tasks.vue'

const router = createRouter({
  routes: [{
    path: '/tasks',
    component: Tasks
  }, {
    path: '/',
    component: Home
  }
  ],
  history: createWebHistory()
})


createApp(App).use(router).use(store).mount('#app');