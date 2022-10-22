import stayApp from '../views/stay-app.vue'
import stayDetails from '../views/stay-details.vue'
import loginPage from '../views/login-signup.vue'
import chat from '../views/chat.vue'
import chatHost from '../views/chat-host.vue'
import backofficePage from '../views/backoffice.vue'
import myTrips from '../views/my-trips.vue'
// import stayEdit from '../views/stay-edit.vue'
// import signupPage from '../views/signup-page.vue'
// import userDetails from '../views/user-details.vue'
// import reviewPage from '../views/review-page.vue'

import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'stay-app',
			component: stayApp,
		},
		{
			path: '/stay/:id?',
			name: 'stay-details',
			component: stayDetails,
		},
		{
			path: '/chat/:name?',
			name: 'chat',
			component: chat,
		},
		{
			path: '/chat-host',
			name: 'chat-host',
			component: chatHost,
		},
		{
			path: '/login',
			name: 'login-page',
			component: loginPage,
		},
		{
			path: '/host',
			name: 'host',
			component: backofficePage,
		},
		{
			path: '/myTrips',
			name: 'my-trips',
			component: myTrips,
		},
		// {
		// 	path: '/user',
		// 	name: 'user-details',
		// 	component: userDetails,
		// },
		// {
		// 	path: '/review',
		// 	name: 'review-page',
		// 	component: reviewPage,
		// },
	],
})

export default router
