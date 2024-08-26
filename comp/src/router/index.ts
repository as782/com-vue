import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path:'/textunderline',
      name:'textunderline',
      component: () => import('@/views/TextUnderlinePage.vue')
    }
  ]
    
})

export default router
