<template>
  <div>
    <div v-for="image in images" :key="image.id">
      <img class="main" :src="image.url_n" :alt="image.title">
      <div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContainerImage',
  data () {
    return {}
  },
  props: {
    images: Array
  }

}
</script>
<style scoped>
</style>
