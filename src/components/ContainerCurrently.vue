<template>
  <div class="grid-x align-spaced grid-margin-x ">
    <div class="current-temp cell">
      <h1>{{ cityDisplay }},</h1>
      <h1>{{ stateDisplay }}</h1>
      <h1>
        {{ currently.temperature }}&#176;
        <skycon v-bind:condition="currently.icon" />
      </h1>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContainerCurrently',
  data () {
    return {}
  },
  watch: {},
  mounted () {},
  props: {
    currently: Object,
    cityDisplay: String,
    stateDisplay: String
  }
}
</script>
<style scoped></style>
