export const storageService = {
	query,
	get,
	post,
	put,
	remove,
	postMany,
}

function query(entityType) {
	var entities = JSON.parse(localStorage.getItem(entityType)) || []

	return Promise.resolve(entities)
}

function get(entityType, entityId) {
	console.log(entityId)
	var a = query(entityType).then((entities) => entities.find((entity) => entity._id === entityId))
	// var a = query(entityType).then((entities) => console.log(entities))
	console.log(a);
	return a
}
function post(entityType, newEntity) {
	newEntity = JSON.parse(JSON.stringify(newEntity))
	newEntity._id = _makeId()
	return query(entityType).then((entities) => {
		entities.push(newEntity)
		_save(entityType, entities)
		return newEntity
	})
}
function postMany(entityType, newEntities) {
	return query(entityType).then((entities) => {
		newEntities = newEntities.map((entity) => ({...entity, _id: _makeId()}))
		entities.push(...newEntities)
		_save(entityType, entities)
		return entities
	})
}

function put(entityType, updatedEntity) {
	return query(entityType).then((entities) => {
		const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
		entities.splice(idx, 1, updatedEntity)
		_save(entityType, entities)
		return updatedEntity
	})
}

function remove(entityType, entityId) {
	return query(entityType).then((entities) => {
		const idx = entities.findIndex((entity) => entity._id === entityId)
		entities.splice(idx, 1)
		_save(entityType, entities)
	})
}

function _save(entityType, entities) {
	localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
	var text = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}


// _save('stay', [
// 		{
// 			'_id': '10006546',
// 			'name': 'Ribeira Charming Duplex 1',
// 			'type': 'House',
// 			'imgUrls': [
// 				'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
// 				'otherImg.jpg',
// 			],
// 			'price': 80.0,
// 			'summary':
// 				'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
// 			'capacity': 8,
// 			'tags': ['snow', 'islands', 'omg'],
// 			'amenities': [
// 				'TV',
// 				'Wifi',
// 				'Kitchen',
// 				'Smoking allowed',
// 				'Pets allowed',
// 				'Cooking basics',
// 			],
// 			'host': {
// 				'_id': '51399391',
// 				'fullname': 'Davit Pok',
// 				'imgUrl':
// 					'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
// 			},
// 			'loc': {
// 				'country': 'Portugal',
// 				'countryCode': 'PT',
// 				'city': 'Porto',
// 				'address': '17 Kombo st',
// 				'lat': -8.61308,
// 				'lng': 41.1413,
// 			},
// 			'reviews': [
// 				{
// 					'id': 'madeId',
// 					'txt': 'Very helpful hosts. Cooked traditional...',
// 					'rate': 4,
// 					'by': {
// 						'_id': 'u102',
// 						'fullname': 'user2',
// 						'imgUrl': '/img/img2.jpg',
// 					},
// 				},
// 			],
// 			'likedByUsers': ['mini-user'], // for user-wishlist : use $in
// 		},
// 		{
// 			'_id': '10006547',
// 			'name': 'Ribeira Charming Duplex 2',
// 			'type': 'House',
// 			'imgUrls': [
// 				'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
// 				'otherImg.jpg',
// 			],
// 			'price': 80.0,
// 			'summary':
// 				'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
// 			'capacity': 8,
// 			'tags': ['snow', 'islands', 'omg'],
// 			'amenities': [
// 				'TV',
// 				'Wifi',
// 				'Kitchen',
// 				'Smoking allowed',
// 				'Pets allowed',
// 				'Cooking basics',
// 			],
// 			'host': {
// 				'_id': '51399391',
// 				'fullname': 'Davit Pok',
// 				'imgUrl':
// 					'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
// 			},
// 			'loc': {
// 				'country': 'Portugal',
// 				'countryCode': 'PT',
// 				'city': 'Porto',
// 				'address': '17 Kombo st',
// 				'lat': -8.61308,
// 				'lng': 41.1413,
// 			},
// 			'reviews': [
// 				{
// 					'id': 'madeId',
// 					'txt': 'Very helpful hosts. Cooked traditional...',
// 					'rate': 4,
// 					'by': {
// 						'_id': 'u102',
// 						'fullname': 'user2',
// 						'imgUrl': '/img/img2.jpg',
// 					},
// 				},
// 			],
// 			'likedByUsers': ['mini-user'], // for user-wishlist : use $in
// 		},
// 		{
// 			"_id": "10006548",
// 			"name": "Ribeira Charming Duplex",
// 			"type": "House",
// 			"imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "https://a0.muscache.com/im/users/31635864/profile_pic/1429604852/original.jpg?aki_policy=profile_x_medium", "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "https://a0.muscache.com/im/users/31635864/profile_pic/1429604852/original.jpg?aki_policy=profile_x_medium", "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large"],
// 			"price": 80.00,
// 			"summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
// 			"capacity": 8,
// 			"tags": ['snow', 'islands', 'omg'],
// 			"amenities": [
// 				"TV",
// 				"Wifi",
// 				"Kitchen",
// 				"Smoking allowed",
// 				"Pets allowed",
// 				"Cooking basics"
// 			],
// 			"host": {
// 				"_id": "51399391",
// 				"fullname": "Davit Pok",
// 				"imgUrl": "https://a0.muscache.com/im/pictures/c9b876fc-b30e-4951-8f88-af9add00939e.jpg?aki_policy=profile_small",
// 			},
// 			"loc": {
// 				"country": "Portugal",
// 				"countryCode": "PT",
// 				"city": "Porto",
// 				"address": "17 Kombo st",
// 				"lat": -8.61308,
// 				"lng": 41.1413
// 			},
// 			"reviews": [
// 				{
// 					"id": "madeId",
// 					"txt": "Very helpful hosts. Cooked traditional...",
// 					"rate": 4,
// 					"by": {
// 						"_id": "u102",
// 						"fullname": "user2",
// 						"imgUrl": "/img/img2.jpg"
// 					}
// 				},
// 				{
// 					"id": "gfdgfds",
// 					"txt": "nice hosts. Cooked traditional...",
// 					"rate": 5,
// 					"by": {
// 						"_id": "u103",
// 						"fullname": "user2",
// 						"imgUrl": "/img/img2.jpg"
// 					}
// 				}
// 			],
// 			"likedByUsers": ['mini-user'] // for user-wishlist : use $in
// 		}
// ])