export function checkDuplicates() {
if (this.savedHistoryArr[this.c].city === this.names.data[this.c].city) {
this.searchArray.splice(this.c, 1)
this.names.data.splice(this.c, 1)
// alert('contains')
} else alert('nope')
}
