// flickr
export default function search() {
this.loading = true
this.fetchImages().then(response => {
this.images = response.data.photos.photo
this.imageHistory = response.data.photos.photo
this.loading = false
this.createNewObject()
this.newImageHistory()
})
}
