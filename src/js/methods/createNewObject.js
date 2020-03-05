export function createNewObject() {
// create a new object from imageHistory array - original
const self = this

self.newHistoryObj = self.imageHistory

self.newHistoryObj = Object.assign({}, self.newHistoryObj[0], {
longitude: self.longNum,
latitude: self.latNum,
city: self.cityDisplay,
state: self.stateDisplay,
icon: self.currently.icon,
temp: self.currently.temperature
})
}
