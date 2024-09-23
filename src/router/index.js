import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: '/today'
		},
		{
			path: '/today',
			name: 'today',
			component: () => import('@/views/TodayView.vue')
		},
		{
			path: '/week',
			name: 'week',
			component: () => import('@/views/WeekView.vue')
		},
		{
			path: '/:catchAll(.*)',
			name: 'NotFound',
			component: () => import('@/views/NotFoundView.vue')
		}
	]
})

export default router
