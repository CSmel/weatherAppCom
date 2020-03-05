import axios from 'axios'

export default function fetchImages() {
return axios({
method: 'get',
url: 'https://api.flickr.com/services/rest',
params: {
method: 'flickr.photos.search',
api_key: '9e2afe6c0b729db22a911ea0aa55daaf',
text: this.tagSearch,
extras: 'url_n, owner_name, date_taken, views',
page: 1,
format: 'json',
nojsoncallback: 1,
per_page: 1,
sort: 'interestingness-desc'
}
})
}
