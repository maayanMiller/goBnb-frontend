import {stayService} from '../../services/stay.service.js'
import {orderService} from '../../services/order.service.js'
// import {socketService} from '../../services/socket.service'

export default {
	state: {
		orders: null,
		filterBy: null,
		country: '',
	},
	getters: {
		getStays(state) {
			return state.stays
		},

		getPrices(state) {
			if (!state.stays) return
			const prices = state.stays.map((stay) => stay.price)
			const count = {}
			for (const element of prices) {
				if (count[element]) {
					count[element] += 1
				} else {
					count[element] = 1
				}
			}
			return count
		},
	},
	mutations: {
		setStays(state, {stays}) {
			state.stays = stays
		},

		setFilterBy(state, {filterBy}) {
			if (filterBy.country) state.country = filterBy.country
			state.filterBy = filterBy
			state.filterBy.country = state.country
		},

		removeStay(state, {stayId}) {
			var stays = JSON.parse(JSON.stringify(state.stays))
			var stayIdx = stays.findIndex((stay) => stay._id === stayId)
			stays.splice(stayIdx, 1)
			state.stays = stays
		},

		addStay(state, {stay}) {
			state.stays.push(stay)
		},

		updateStay(state, {stay}) {
			const idx = state.stays.findIndex((currStay) => currStay._id === stay._id)
			state.stays.splice(idx, 1, stay)
		},
	},
	actions: {
		async loadStays(context) {
			try {
				var filterBy = context.state.filterBy ? context.state.filterBy : ''
				const stays = await stayService.query(filterBy)
				context.commit({type: 'setStays', stays: stays})

				return stays
			} catch (err) {
				console.log(err)
			}
		},

		async getStayById(context, {stayId}) {
			try {
				return await stayService.getStayById(stayId)
			} catch (err) {
				console.log(err)
			}
		},
		getEmptyStay() {
			return stayService.getEmptyStay()
		},

		async removeStay(context, {stayId}) {
			try {
				await stayService.removeStay(stayId)
				context.commit({type: 'removeStay', stayId})
				// socketService.emit('deleteStay', stayId)
				return
			} catch (err) {
				console.log(err)
			}
		},

		async saveStay(context, {stay}) {
			try {
				// if (!context.state.stays) await context.dispatch({ type: 'loadStays' })
				const isEdit = !!stay._id
				const savedStay = await stayService.saveStay(stay)
				context.commit({type: isEdit ? 'updateStay' : 'addStay', stay: savedStay})
			} catch (err) {
				console.log(err)
			}
		},
		async setFilterBy(context, {filterBy}) {
			console.log('state.filterBy:', context.state.filterBy)
			try {
				const stays = await stayService.query(context.state.filterBy)
				context.commit({type: 'setFilterBy', filterBy})
				context.commit({type: 'setStays', stays: stays})
			} catch (err) {
				console.log(err)
			}
		},
		async addReview(context, { review ,stay}) {
		const st= {...stay}
		st.reviews.unshift(review)
			console.log('st:', st)
			try {
					// review = await reviewService.add(review)
					// context.commit({ type: 'addReview', review })
					// context.dispatch({type: 'increaseScore'})

					return review
			} catch (err) {
					// console.log('reviewStore: Error in addReview', err)
					throw err
			}
	},
	},
	modules: {},
}
