<template>
    <h1>gobnb host</h1>
  <div class="container">


    <form v-if="!hostName" @submit.prevent="changeUser">
      <input type="text" v-model="hostName" placeholder="hostName" />
    </form>


    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }}:</span>{{ msg.txt }}
      </li>
    </ul>
    <hr />


    <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" placeholder="Your msg" />
      <button>Send</button>
    </form>

  </div>

</template>

<script>
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'

export default {
  data() {
    return {
      msg: { from: '', txt: '' },
      msgs: [],
      hostName: null,

    }
  },
  created() {
    console.log(this.userName)
    console.log(this.hostName)
    // socketService.setup()
    socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg)
  },
  destroyed() {
    socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
    // socketService.terminate()
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg)
    },
    sendMsg() {
      console.log('Sending', this.msg)
      socketService.emit(SOCKET_EMIT_SET_TOPIC, this.hostName)

      const from = this.hostName
      this.msg.from = from
      socketService.emit(SOCKET_EMIT_SEND_MSG, this.msg)
      this.msg = { from, txt: '' }
    },
    changeUser() {
      socketService.emit(SOCKET_EMIT_SET_TOPIC, this.hostName)
    }
  }
}
</script>
