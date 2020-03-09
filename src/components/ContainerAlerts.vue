<template>
  <div class="grid-x align-spaced small-up-2 medium-up-2 large-up-4">
    <div class="cell callout alert auto" v-if="!alerts || !alerts.length">
      <p>No alerts, yet.</p>
    </div>
    <div
        class="grid-x align-spaced small-up-2 medium-up-2 large-up-4"
        v-for="alert in alerts"
        v-bind:key="alert.title"
        v-else
    >
      <div class="cell">
        <h5>Title</h5>
        <p>{{ alert.title }}</p>
      </div>
      <div class="cell">
        <h5>Severity</h5>
        <p>{{ alert.severity }}</p>
      </div>
      <div class="cell">
        <h5>Time</h5>
        <p>{{ alert.time | moment("h a") }}</p>
      </div>
      <div class="cell">
        <h5>Expires</h5>
        <p>{{ alert.expires | moment("h a") }}</p>
      </div>
      <div class="grid-x align-spaced ">
        <div class="cell large-9">
          <h5>Description</h5>
          <span class="no-center"
          ><p>{{ alert.description }}</p></span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContainerAlerts',
  data () {
  return {}
  },
props: {
alerts: Object
  },
mounted() {
}
}
</script>
<style scoped></style>
