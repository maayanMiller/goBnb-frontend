// import {storageService} from './async-storage.service.js'
// import stayData from '@/data/stay.json'
import {httpService} from './http.service'
import {makeId} from './util.service.js'

const ENDPOINT = 'stay'

async function query(filterBy = {}) {
	return await httpService.get(ENDPOINT, filterBy)
}

async function getStayById(stayId) {
	return await httpService.get(`${ENDPOINT}/${stayId}`)
}

async function removeStay(stayId) {
	// return await storageService.delete(`${ENDPOINT}/${stayId}`)
	return await httpService.delete(`${ENDPOINT}/${stayId}`)
}

async function saveStay(stay) {
	return stay._id
		? await httpService.put(`${ENDPOINT}/${stay._id}`, stay)
		: await httpService.post(ENDPOINT, stay)
}

function getEmptyStay() {
	var emptyStay = {
		name: '',
		price: 0,
		type: null,
		reviews: [],
	}
	return emptyStay
}

export const stayService = {
	query,
	getStayById,
	getEmptyStay,
	removeStay,
	saveStay,
}

function _buildFilterCriteria(filterBy = {tag: '', country: ''}) {
	let filteredStays = stayData
	const {tag, country, byPrice} = filterBy
	if (tag) {
		const regex = new RegExp(filterBy.tag, 'i')
		filteredStays = stayData.filter((stay) => regex.test(stay.tags))
	}
	if (country) {
		const regex = new RegExp(filterBy.country, 'i')
		filteredStays = stayData.filter((stay) => regex.test(stay.address.country))
	}

	if (byPrice) {
		filteredStays = stayData.filter((stay) => stay.price > byPrice.minPrice)
		filteredStays = filteredStays.filter((stay) => stay.price < byPrice.maxPrice)
	}
	return filteredStays
}
