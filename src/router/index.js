import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  linkExactActiveClass: 'bg-primary text-light',
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          component: () => import('../views/PieChart.vue')
        },
        {
          path: '/line',
          component: () => import('../views/LineChart.vue')
        },
        {
          path: '/bar',
          component: () => import('../views/BarChart.vue')
        }
      ]
    }
  ]
})

export default router
