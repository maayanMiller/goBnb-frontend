import {orderService} from '../../services/order.service.js'
import {tripService} from '../../services/trip.service.js'
// import {socketService} from '../../services/socket.service'
import {userService} from '../../services/user.service.js'

export default {
	state: {
		orders: null,
		trips: null,
		filterBy: null,
		country: '',
		trip: null,
	},
	getters: {
		getOrders(state) {
			return state.orders
		},
		getTrips(state) {
			return state.trips
		},
		currentTrip(state) {
			return state.trip
		},
	},
	mutations: {
		setOrders(state, {orders}) {
			//For Backoffice - user that wish to see his orders, get order from order table by hostId
			state.orders = orders.reverse()
		},
		setTrips(state, {orders}) {
			//For myTrips - user that wish to see his upcomming trips, get order from order table by guestId
			console.log('orders:', orders)
			state.trips = orders
		},
		removeOrder(state, {orderId}) {
			var orders = JSON.parse(JSON.stringify(state.orders))
			var orderIdx = orders.findIndex((order) => order._id === orderId)
			orders.splice(orderIdx, 1)
			state.orders = orders
		},
		addOrder(state, {order}) {
			state.orders.push(order)
		},
		updateOrder(state, {order}) {
			const idx = state.orders.findIndex((currOrder) => currOrder._id === order._id)
			state.orders.splice(idx, 1, order)
		},
		setCurrentTripDates(state, {dates}) {
			state.trip.dates = dates
			// tripService.save('currentTrip', trip)
		},
		saveCurrentTrip(state, {trip}) {
			state.trip = trip
			state.trip.dates = trip.dates
		},
		addCurrentTrip(state) {
			state.trip = tripService.query()
		},
		handleApprove(state, {orderId, status, type, index}) {
			state.orders[index].status = status
		},
	},
	actions: {
		async loadTrips(context) {
			try {
				const userId = userService.getLoggedinUser()._id //Here we use _id instead of userId in order not to ovveride mongoDB _id
				console.log('userId:', userId)
				const orders = await orderService.query({type: 'trips', userId: userId})
				context.commit({type: 'setTrips', orders})
				return orders
			} catch (err) {
				console.log(err)
			}
		},
		async loadOrders(context) {
			try {
				const userId = userService.getLoggedinUser()._id //Here we use appId instead of userId in order not to ovveride mongoDB _id
				const orders = await orderService.query({type: 'orders', userId: userId})
				context.commit({type: 'setOrders', orders})

				return orders
			} catch (err) {
				console.log(err)
			}
		},
		async updateOrder(context, {order}) {
			try {
				// if (!context.state.orders) await context.dispatch({ type: 'loadorders' })
				const isEdit = !!order._id
				const savedOrder = await orderService.saveOrder(order)
				context.commit({type: isEdit ? 'updateOrder' : 'addOrder', order: savedOrder})
			} catch (err) {
				console.log(err)
			}
		},
		async removeOrder(context, {orderId}) {
			try {
				await orderService.removeOrder(orderId)
				context.commit({type: 'removeOrder', orderId})
				return
			} catch (err) {
				console.log(err)
			}
		},

		async saveOrder(context, {trip}) {
			//Here we take user from sessionStorage, otherway backend take it from cookies and it will be the same for both browsers.
			const user = userService.getLoggedinUser()
			const order = trip
			order.mainGuest = {
				guestId: user._id,
				fullName: user.fullname,
				imgUrl: user.imgUrl,
			}
			console.log('order:', order)
			try {
				const isEdit = !!order._id
				const savedOrder = await orderService.saveOrder(order)
				// context.commit({type: isEdit ? 'updateOrder' : 'addOrder', order: savedOrder})
			} catch (err) {
				console.log(err)
			}
		},
	},
	modules: {},
}
