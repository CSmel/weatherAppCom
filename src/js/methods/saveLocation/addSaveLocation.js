export function addSaveLocation() {
if (this.newHistoryObj === '') {
alert('Empty Object')
} else if (!this.savedHistoryArr.length) {
this.savedHistoryArr.push(this.newHistoryObj)
// console.log(this.newHistoryObj.city)
this.newHistoryObj = ''
console.log('First push')
} else if (!this.savedHistoryArr[0].city.includes(this.newHistoryObj.city)) {
this.savedHistoryArr.push(this.newHistoryObj)
// console.log(this.newHistoryObj.city)
this.newHistoryObj = ''
} else if (this.savedHistoryArr[0].city.includes(this.newHistoryObj.city)) {
alert('DUPLICATE')
} else {
console.log('WHAT?')
}
}
