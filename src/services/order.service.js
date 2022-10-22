import {httpService} from './http.service'
const ENDPOINT = 'order'
async function query(filterBy = {}) {
	return await httpService.get(ENDPOINT, filterBy)
}
async function getOrderById(orderId) {
	return await httpService.get(`${ENDPOINT}/${orderId}`)
}
async function removeOrder(orderId) {
	return await httpService.delete(`${ENDPOINT}/${orderId}`)
}
async function saveOrder(order) {
	return order._id
		? await httpService.put(ENDPOINT, order)
		: await httpService.post(ENDPOINT, order)
}
export const orderService = {
	query,
	getOrderById,
	removeOrder,
	saveOrder,
}
