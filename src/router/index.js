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
			component: () => import('@/views/TodayView.vue'),
			meta: {
				title: 'Weather - today',
			},
		},
		{
			path: '/week',
			name: 'week',
			component: () => import('@/views/WeekView.vue'),
			meta: {
				title: 'Weather - week',
			},
		},
		{
			path: '/:catchAll(.*)',
			name: 'NotFound',
			component: () => import('@/views/NotFoundView.vue'),
			meta: {
				title: 'Not Found',
			},
		}
	]
})

router.beforeEach((to) => {
	document.title = to.meta?.title ?? 'Weather app'
})

export default router
