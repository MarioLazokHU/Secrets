import { createRouter, createWebHistory } from 'vue-router';
import Home from '../src/views/Home.vue';
import Secrets from '../src/views/Secrets.vue';
import AddSecret from '../src/views/AddSecret.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/secrets', component: Secrets },
  { path: '/add-secret', component: AddSecret },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;