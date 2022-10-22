import {createStore} from 'vuex'
import stayStore from './modules/stay-store.js'
import {userStore} from './modules/user.store.js'
import orderStore from './modules/order-store.js'

const store = createStore({
	strict: true,
	modules: {
		stayStore,
		userStore,
		orderStore,
	},
})

export default store
