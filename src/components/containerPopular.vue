<template>
  <div>
    <div class="cell small2">
      <div class="">
        <div
            class="container-popular"
            v-for="(x, index) in savedHistoryArr"
            :key="x.id"
        >
          <div>
            <img :src="x.url_n"/>
          </div>
          <h2>
            <span>
              <font-awesome-icon
                  @click.prevent="deleteSaveLocation(index)"
                  icon="trash-alt"
              /></span>
            <!-- <span> <button @click.prevent="saveLocation">save</button></span>-->
          </h2>
        </div>
      </div>
    </div>
    <h2><span></span></h2>
    <button @click.prevent="addSaveLocation">
      <font-awesome-icon icon="plus-circle"/>
    </button>
  </div>
</template>
<script>
export default {
  name: 'containerPopular',
  data () {
    return {
    saveLink: ''
    }
  },
mounted: function () {
},
methods: {},
props: {
savedHistoryArr: {
type: Array,
required: true
},
deleteSaveLocation: Function,
addSaveLocation: Function
  }
}
</script>
<style scoped>
.container-popular {
  height: auto;
  position: relative;
}

button {
  height: 500px;
}

h2 {
  position: absolute;
  top: 110px;
  left: 60px;
  width: 100%;
}

h2 span {
  padding: 5px 8px 5px 8px;
  color: white;
  font: bold 24px/45px Helvetica, Sans-Serif;
  letter-spacing: -1px;
  background: rgb(0, 0, 0); /* fallback color */
  background: rgba(0, 0, 0, 0.7);
  border-radius: 200px;
}
</style>
