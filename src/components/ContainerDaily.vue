<template>
  <div class="grid-x grid-padding-x small-up-2 medium-up-4 large-up-8">
    <div class="cell alternate-color" v-for="day in daily.data" v-bind:key="day.time">
      <h4>{{ day.time | moment("ddd") }}</h4>
      <h5>{{ day.time | moment("Do") }}</h5>
      <skycon v-bind:condition="day.icon" />
      <p>{{ day.temperatureHigh }}&#176;</p>
      <p>{{ day.temperatureLow }}&#176;</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContainerDaily',
  data () {
    return {}
  },
  props: {
    daily: Object
  }
}
</script>
<style scoped></style>
