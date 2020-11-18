<template>
  <div class="sample_container">
    <div class="message">
      {{msg}}
    </div>
    <button @click = "sendRequest">Click Me!</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      msg: 'hello'
    }
  },
  methods: {
    sendRequest () {
      var Vue = this
      axios.get('/api/').catch(function (response) {
        // console.log(response.data.message)
        Vue.msg = response.data.message
      })
    }
  }
}
</script>

<style scoped>
.sample_container {
  background-color: #66CCFF;
  height: 100%;
}

.message {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%,-50%);
}

button {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>
