<template>
  <div class="chat-container">
    <h1>gobnb</h1>
    <h4>Hello {{ userName }}</h4>
    <h4>write to {{ hostName }}</h4>
    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }}:</span>{{ msg.txt }}
      </li>
    </ul>

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
      msg: { from: 'Guest', txt: '' },
      msgs: [],
      hostName: null,
      userName: null,

    }
  },
  created() {
    this.userName = userService.getLoggedinUser().fullname
    this.hostName = this.$route.params.name
    console.log(this.userName)
    console.log(this.hostName)

    socketService.emit(SOCKET_EMIT_SET_TOPIC, this.hostName)
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
      const from = this.userName
      this.msg.from = from
      socketService.emit(SOCKET_EMIT_SEND_MSG, this.msg)
      this.msg = { from, txt: '' }
    },
  }
}
</script>
