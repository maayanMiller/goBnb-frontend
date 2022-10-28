<template>
	<section class="backoffice-section details-layout">
		<!-- <pre>{{ orders }}}</pre> -->
		<!-- <div class="recent-orders-table details-layout">
			<div class="table-header">
				<div>Booked</div>
				<div>Stay</div>
				<div>Check in/Check out</div>
				<div>Nights</div>
				<div>Price</div>
				<div>Guests</div>
				<div>Main guest</div>
				<div>Status</div>
				<div>Actions</div>
			</div>
			<div class="table-body" v-for="(order, index) in orders" :key="order._id">
				<div>{{ booked(order) }}</div>
				<div>
					<p>{{ order.stayName }}</p>
					<p>{{ order.destination.country }}</p>
					<p>{{ order.destination.address }}</p>
				</div>
				<div>{{ check(order) }}</div>
				<div>{{ nights(order) }}</div>
				<div>{{ price(order) }}</div>
				<div>{{ guests(order) }}</div>
				<div>
					<img class="main-guest-img" :src="order.mainGuest.imgUrl" />
					<p class="back-p">{{ order.mainGuest.fullName }}</p>
				</div>
				<div>{{ order.status }}</div>
				<div>
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
				</div>
			</div>
		</div> -->
		<div class="divTable unstyledTable ">
			<div class="divTableHeading">
				<div class="divTableRow">
					<div class="divTableHead">Booked</div>
					<div class="divTableHead">Stay</div>
					<div class="divTableHead">Check in/Check out</div>
					<div class="divTableHead">Nights</div>
					<div class="divTableHead">Price</div>
					<div class="divTableHead">Guests</div>
					<div class="divTableHead">Main guest</div>
					<div class="divTableHead">Status</div>
					<div class="divTableHead">Actions</div>
				</div>
			</div>
			<div class="divTableBody">
				<div class="divTableRow" v-for="(order, index) in orders"
					:key="order._id">
					<div class="divTableCell">{{ booked(order) }}</div>
					<div class="divTableCell">
						<p>{{ order.stayName }}</p>
						<p>{{ order.destination.country }}</p>
						<p>{{ order.destination.address }}</p>
					</div>
					<div class="divTableCell">{{ check(order) }}</div>
					<div class="divTableCell">{{ nights(order) }}</div>
					<div class="divTableCell">{{ price(order) }}</div>
					<div class="divTableCell">{{ guests(order) }}</div>
					<div class="divTableCell">
						<img class="main-guest-img" :src="order.mainGuest.imgUrl" />
						<p class="back-p">{{ order.mainGuest.fullName }}</p>
					</div>
					<div class="divTableCell ">
						<div :class="statusLable(index)" class="table-button">
							{{ order.status }}
						</div>
					</div>
					<div class="divTableCell">
						<div class="table-button-container">
							<div class="table-button approve"
								@click="handleApprove(index, order)">
								Approve
							</div>
							<div class="table-button decline"
								@click="handleDecline(index, order)">
								Decline
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
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
	computed: {

	},

	methods: {
		async loadOrders() {
			var oneDay = 1000 * 60 * 60 * 24
			this.orders = await this.$store.dispatch('loadOrders')
			console.log('orders:', this.orders)
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
		statusLable(i) {
			if (this.orders[i].status === 'approved') return 'approve'
			if (this.orders[i].status === 'pending') return 'pending'
			else
			{
				return 'decline'
			}
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
