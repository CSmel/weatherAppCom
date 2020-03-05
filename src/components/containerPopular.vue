<template>
  <div>
    <div class="cell small-2">
      <div class="">
        <div
            class="container-popular"
            v-for="(x, index) in savedHistoryArr"
            :key="x.id"
        >
          <div class="save-lo-con">
            <img :src="x.url_n"/>
            <span class="save-lo-city"> {{ x.city }} , {{ x.state }} </span>
            <span class="save-lo-temp">
              <h3>{{ x.temp }}</h3></span
            >
            <span class="save-lo-icon"
            ><skycon v-bind:condition="x.icon"
            /></span>
          </div>
          <span class="save-lo-trash">
            <font-awesome-icon
                @click.prevent="deleteSaveLocation(index)"
                icon="trash-alt"
            /></span>
          <!-- <span> <button @click.prevent="saveLocation">save</button></span>-->
        </div>
      </div>
    </div>
    <button @click.prevent.once="addSaveLocation">
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
  height: 100%;
  position: relative;
  padding-top: 30px;
}

button {
  height: 500px;
}

img {
  height: 50vh;
  position: absolute;
  top: -10%;
  left: 0;
}

.save-lo-con {
  position: relative;
  height: 100px;
  width: 100%;
  overflow: hidden;

  right: 0;
}

.save-lo-city {
  position: absolute;
  color: white;
  top: 15%;
  left: 20%;
}

.save-lo-temp {
  position: absolute;
  left: 25%;
  bottom: 6%;
}

.save-lo-icon {
  position: absolute;
  left: 5%;
  bottom: 5%;
}
h2 {
  position: absolute;
  top: 5%;
  left: 50px;
  width: 100%;
}

.save-lo-trash {
  position: absolute;
  top: 80%;
  left: 90%;
  padding: 0 15px 0 15px;
  color: white;
  font: bold 20px/45px Helvetica, Sans-Serif;
  letter-spacing: -1px;
  background: rgb(0, 0, 0); /* fallback color */
  background: rgba(0, 0, 0, 0.7);
  border-radius: 200px;
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
