// const fs = require('fs')

// const stays = require('./stay.json')

// console.log('hi');
// function createUniqueAmeneties(stays) {
//     let totalAmeneties = []
//     stays.forEach((stay, idx) => {
//         totalAmeneties.push(...stay.amenities)
//     })
//     let uniqueAmeneties = [...new Set(totalAmeneties)]
//     return uniqueAmeneties
// }

// const newAmenities = createUniqueAmeneties(stays)

// fs.writeFile('unique-ameneties.json', JSON.stringify(newAmenities, null, 2),  err =>{
//     if(err) {
//         console.log(err)
//     }
// })

// function createAmentiesMap(amenties) {
//     let amenitiesMap = {}
//     amenties.forEach(amenty => {
//         amenitiesMap[amenty] = `<i class="fas fa-${amenty}"></i>`
//         console.log(amenitiesMap)
//     })

//     fs.writeFile('amenties-map.json', JSON.stringify(amenitiesMap, null, 2),  err =>{
//         if(err) {
//             console.log(err)
//         }
//     })
// }

// createAmentiesMap(newAmenities)
