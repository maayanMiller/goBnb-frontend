<template>
	<section class="backoffice-section">
		<!-- <pre>{{ orders }}}</pre> -->
		<table class="recent-orders-table">
			<tr class="ter">
				<th>Booked</th>
				<th>Check in/Check out</th>
				<th>Nights</th>
				<th>Price</th>
				<th>Guests</th>
				<th>Main guest</th>
				<th>Status</th>
				<th>Actions</th>
			</tr>
			<tr v-for="(order, index) in orders" :key="order._id">
				<td>{{ booked(order) }}</td>
				<td>{{ check(order) }}</td>
				<td>{{ nights(order) }}</td>
				<td>{{ price(order) }}</td>
				<td>{{ guests(order) }}</td>
				<td>
					<img class="main-guest-img" :src="order.mainGuest.imgUrl" />
					<p class="back-p">{{ order.mainGuest.fullName }}</p>
				</td>
				<td>{{ order.status }}</td>
				<td>
					<div class="table-button-container">
						<button class="table-button approve"
							@click="handleApprove(index, order)">
							Approve
						</button>
						<button class="table-button decline"
							@click="handleDecline(index, order)">
							Decline
						</button>
					</div>
				</td>
			</tr>
		</table>
	</section>
</template>
<script>
export default {
	data() {
		return {
			orders: null,
			currOrderIdx: null,
			oldOrders: null,
			recentOrders: null,
		}
	},
	created() {
		this.loadOrders()


	},


	methods: {
		async loadOrders() {
			var oneDay = 1000 * 60 * 60 * 24
			this.orders = await this.$store.dispatch('loadOrders')
			this.oldOrders = this.orders.filter(function (order) {
				return (
					(new Date().getTime() - new Date(order.orderDate).getTime()) / oneDay > 1 &&
					order.status !== 'pending'
				)
			})
			this.recentOrders = this.orders.filter(function (order) {
				return (
					(new Date().getTime() - new Date(order.orderDate).getTime()) / oneDay <= 1 ||
					order.status === 'pending'
				)
			})
		},
		// recentOrderDate(dates) {
		// 	order.status === 'pending'
		// },


		// filterTag(value, row) {
		// 	return row.tag === value
		// },
		// filterHandler(value, row, column) {
		// 	const property = column['property']
		// 	return row[property] === value
		// },
		// showStay(stayId) {
		// 	this.$router.push(`/stay/${stayId}`) // + row._id)622f337a75c7d36e498aab05
		// },
		handleApprove(index, row) {
			this.isShown = !this.isShown
			this.$store.commit({ type: 'handleApprove', orderId: row._id, status: 'approved', index })
			this.$store.dispatch({ type: 'updateOrder', order: this.orders[index] })
		},
		handleDecline(index, row) {
			this.isShown = !this.isShown
			this.$store.commit({ type: 'handleApprove', orderId: row._id, status: 'declined', index })
			this.$store.dispatch({ type: 'updateOrder', order: this.orders[index] })
		},
		// statusLable(i) {
		// 	if (this.orders[i].status === 'approved') return 'success'
		// 	if (this.orders[i].status === 'pending') return 'warning'
		// 	else
		// 	{
		// 		return 'danger'
		// 	}
		// },
		booked(order) {
			let formatedData = ''
			const oneMinute = 1000 * 60
			const oneHour = 1000 * 60 * 60
			const oneDay = 1000 * 60 * 60 * 24
			const interval = new Date().getTime() - new Date(order.orderDate).getTime()
			let bookedInterval = Math.round(interval / oneDay)
			if (bookedInterval === 0)
			{
				bookedInterval = Math.round(interval / oneHour)
				if (bookedInterval === 0)
				{
					bookedInterval = Math.round(interval / oneMinute)
					if (bookedInterval > 10) formatedData = `${bookedInterval} minutes ago`
					else formatedData = 'new order'
				} else
				{
					formatedData = `${bookedInterval} hours ago`
				}
			} else
			{
				if (bookedInterval === 1)
				{
					formatedData = 'yesterday'
				} else
				{
					formatedData = new Date(order.orderDate).toLocaleString('en-GB', {
						year: 'numeric',
						day: 'numeric',
						month: 'numeric',
					})
				}
			}
			return formatedData
		},
		check(order) {
			let formatedData = ''
			const from = new Date(order.dates[0]).toLocaleString('en-GB', {
				day: 'numeric',
				month: 'numeric',
			})
			const to = new Date(order.dates[1]).toLocaleString('en-GB', {
				year: 'numeric',
				day: 'numeric',
				month: 'numeric',
			})
			formatedData = `${from} - ${to}`
			return formatedData
		},
		nights(order) {
			let formatedData = ''
			const oneDay = 1000 * 60 * 60 * 24
			formatedData = Math.round(
				(new Date(order.dates[1]).getTime() - new Date(order.dates[0]).getTime()) / oneDay
			)
			return formatedData
		},
		price(order) {
			return `$${order.price.toLocaleString()}`
		},
		guests(order) {
			return order.guests.adults + order.guests.children + order.guests.infants
		},
	},
}
</script>
