<template>
  <div>
    <div v-for="image in images" :key="image.id">
      <img class="main-detail" :src="image.url_n" :alt="image.title" />
      <div></div>
    </div>
    <h1>
      {{ cityDisplay }},<br />
      {{ stateDisplay }}
    </h1>
    <div class="image-container">
      <div class="cell  alternate-color small-1" v-for="hour in hourly.data" v-bind:key="hour.time">
        <div class="grid-x">
          <div class="cell small-2">
            {{ hour.time | moment("h a") }}
          </div>
          <div class="cell small-1">
            <skycon v-bind:condition="hour.icon" />
          </div>
          <div class="cell small-2">
            {{ hour.summary }}
          </div>
          <div class="cell small-2">
            <font-awesome-icon icon="temperature-high" />
            {{ hour.temperature }}&#176;
          </div>
          <div class="cell small-2">
            <font-awesome-icon icon="tint" :style="{ color: 'deepskyblue' }" />
            {{ hour.precipProbability }} %
          </div>
          <div class="cell small-2">
            <font-awesome-icon icon="wind" /> {{ hour.windSpeed }} km/h
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContainerHourlyDetail',
  data () {
    return { newIndexValue: null }
  },
  props: {
    hourly: Object,
    cityDisplay: String,
    stateDisplay: String,
    images: Array
  }
}
</script>
<style scoped>
.alternate-color:nth-child(odd) {
  background-color: #5c5c5c;
}
.cell {
  background-color: transparent;
  height: 65px;
}
.main {
  height: 100vh;
}
.image-container {
  height: 70vh;
  overflow: scroll;
}
</style>
