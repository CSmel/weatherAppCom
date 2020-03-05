<template>
  <div class="cell medium-6 large-4">
    <h5>Search For A Location</h5>
    <input type="search" id="search-input" placeholder="Start Searching..."/>
    <form>
      <input class="fakeInput" v-model="tagSearch" type="text" />
      <div>Search History</div>
      <button type="submit" class="go-button fakeInput" @click.prevent="search">
        Search
      </button>
    </form>

    <button @click="a++, b++" :disabled="b > this.namesLength - 1">
      <font-awesome-icon icon="arrow-circle-left" />
    </button>
    {{ b }}
    <button @click="a--, b--" :disabled="a <= 1">
      <font-awesome-icon icon="arrow-circle-right" />
    </button>
    <div v-for="x in names.data.slice(b, a)" :key="x.id">
      <div class="history-overlay">
        <img :src="x.url_n" />

        <h2>
          <span
          ><font-awesome-icon
              class="history-but"
              @click.prevent="getLocalStorage"
              icon="history"
          /></span>
        </h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContainerSearch',
  data () {
    return {
      a: 1,
      b: 0,
      longitude: '',
      latitude: null,
      historyCity: '',
      updateHistory: '',
      jsonObj: []
    }
  },
  mounted () {
    // this.defaultObject();
  //console.log(this.names)
  },

  watch: {
  cityDisplay: function () {
  this.checkDuplicates()
  }
  },
updated() {
},
  methods: {
  checkDuplicates() {
  }
  },
  computed: {},
  props: {
    search: Function,
    tagSearch: Function,
  getLocalStorage: Function,
    cityDisplay: String,
    names: Object,
    namesLength: Number
  }
}
</script>
<style scoped>
.history-overlay {
  position: relative;
  width: 50%; /* for IE 6 */
  margin: auto;
}

h2 {
  position: absolute;
  top: 0;
  left: 80px;
  width: 100%;
}

h2 span {
  color: white;
  font: bold 24px/45px Helvetica, Sans-Serif;
  letter-spacing: -1px;
  background: rgb(0, 0, 0); /* fallback color */
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 100px;
}
</style>
