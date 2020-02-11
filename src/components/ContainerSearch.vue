<template>
  <div class="cell medium-6 large-4">
    <h5>Search For A Location</h5>
    <input type="search" id="search-input" placeholder="Start Searching..." />
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
    <button @click="a--, b--" :disabled="a <= 1">
      <font-awesome-icon icon="arrow-circle-right" />
    </button>

    <h1>Search History</h1>

    <div v-for="x in names.data.slice([b], [a])" :key="x.id">
      <input v-model="x.longitude" />
      <div class="history-overlay">
        <img :src="x.url_n" />
        <h2>
          <span
            ><button @click.prevent="viewPrevHistory">Click Me</button></span
          >
        </h2>
      </div>
      <br />
    </div>
    <br />
    -->
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

      jsonObj: []
    }
  },
  mounted () {
    // this.defaultObject();
  },

  watch: {
    cityDisplay: function () {}
  },

  methods: {},
  computed: {
    longHistoryVal () {
      return this.x.longitude
    }
  },
  props: {
    search: Function,
    tagSearch: Function,
    createNewObject: Function,
    newImageHistory: Function,
    viewPrevHistory: Function,
    cityDisplay: String,
    stateDisplay: String,
    imageHistory: Array,
    names: Object,
    newHistoryObj: Object,
    latNum: Number,
    longNum: Number,
    namesLength: Number
  }
}
</script>
<style scoped>
.history-overlay {
  position: relative;
  width: 100%; /* for IE 6 */
}

h2 {
  position: absolute;
  top: 200px;
  left: 0;
  width: 100%;
}

h2 span {
  color: white;
  font: bold 24px/45px Helvetica, Sans-Serif;
  letter-spacing: -1px;
  background: rgb(0, 0, 0); /* fallback color */
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
}
</style>
