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
    <div class="grid-x current-focus-temp ">
      <div class="grid-x grid-margin-x">
        <div class="cell small-cell-block-y">
          {{ currently.time | moment("ddd") }}
        </div>
        <div class="cell large-cell-block-y">
          {{ currently.time | moment("Do") }}
        </div>
      </div>
      <div class="grid-x small-2">
        <div class="cell">
          <skycon v-bind:condition="currently.icon"/>
        </div>
      </div>
      <div
          class="grid-x grid-margin-x small-6"
          v-for="day in daily.data.slice(0, 1)"
          v-bind:key="day.time"
      >
        <div class="cell small-cell-block-y">
          {{ day.apparentTemperatureHigh }}
        </div>
        <div class="cell large-cell-block-y">
          {{ day.apparentTemperatureLow }}
        </div>
      </div>
      <div class="arrow-down"></div>
    </div>
    <div class="image-container">
      <div
          class="cell  alternate-color small-1"
          v-for="hour in hourly.data.slice(0, 13)"
          v-bind:key="hour.time"
      >
        <div class="grid-x">
          <div class="cell small-3">
            {{ hour.time | moment("h a") }}
          </div>
          <div class="cell small-3">
            <skycon v-bind:condition="hour.icon" />
          </div>
          <div class="cell small-3">
            {{ hour.summary }}
          </div>
          <div class="cell small-3">
            <font-awesome-icon icon="temperature-high" />
            {{ hour.temperature }}&#176;
          </div>
          <div class="cell small-3">
            <font-awesome-icon icon="tint" :style="{ color: 'deepskyblue' }" />
            {{ hour.precipProbability }} %
          </div>
          <div class="cell small-9">
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
  currently: Object,
  daily: Object,
    cityDisplay: String,
    stateDisplay: String,
    images: Array
  }
}
</script>
<style scoped>
  .current-focus-temp {
    position: relative;
    border: 2px solid transparent;
    border-bottom: 10px solid #c29e96;
    background-color: #686868 !important;
    border-radius: 5px;

    margin-bottom: 2vw;
    -webkit-box-shadow: 0 8px 6px -6px #c29e96;
    -moz-box-shadow: 0 8px 6px -6px #c29e96;
    box-shadow: 0 8px 8px -6px #c29e96;
  }

  .arrow-down {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    position: absolute;
    border-top: 30px solid #c29e96;

    margin-left: auto;
    right: 50%;
    top: 100%;
  }
.alternate-color:nth-child(odd) {
  background-color: #5c5c5c;
}
.cell {
  background-color: transparent;
  /* height: 65px; */
}
.main {
  height: 100vh;
}
.image-container {
  height: 70vh;
  overflow: scroll;
}
</style>
