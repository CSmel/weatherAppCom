<template>
  <div class="grid-x customGrid align-spaced small-up-2 medium-up-4 large-up-8">
    <div class="cell small-1" v-for="hour in hourly.data.slice(0, 5)" v-bind:key="hour.time">
      <h3>{{ hour.time | moment("h a") }}</h3>
      <skycon v-bind:condition="hour.icon"/>
      <p>{{ hour.temperature}}&#176;</p>
    </div>
  </div>

</template>
<script>
export default {
  name: 'ContainerHourly',
  data () {
    return {
    }
  },
  props: {
    hourly: Object
  }
}
</script>
<style scoped>
</style>
