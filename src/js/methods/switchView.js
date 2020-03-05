export function switchView() {
this.shown = !this.shown
if (this.shown) {
this.titleOfComponent = 'Home'
} else if (!this.shown) {
this.titleOfComponent = "Today's detailed forecast"
}
}
