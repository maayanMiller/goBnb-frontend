<template>
  <div :class="modal" class="logged-in-modal">
    <header class="log-in-modal-header">
      <div @click="closeModal" class="exit-modal">X</div>
      <p> Log in or sign up </p>
    </header>
    <p>{{ msg }}</p>
    <div class="logged-in-user" v-if="user">
      Welcome back
      {{ user.username }}
      <button class="btn-hover-login color-10" @click="doLogout">Logout</button>
    </div>
    <div class="logged-in-user" v-else>Welcome to Gobnb</div>
    <div class="log-in-signup">
      <p>Login</p>
      <form @submit.prevent="doLogin">
        <select v-model="loginCred.username">
          <option value="" disabled selected>Select User</option>
          <option v-for="user in users" :key="user._id" :value="user.username">
            {{ user.username }}</option>
        </select>
        <button v-if="loginCred.username"
          class="btn-hover-login color-10">Login</button>
      </form>
      <form @submit.prevent="doSignup">
        <p>Signup</p>
        <input class="input-name" type="text" v-model="signupCred.fullname"
          placeholder="Your full name" />
        <input class="input-password" type="text" v-model="signupCred.password"
          placeholder="Password" />
        <input class="input-user" type="text" v-model="signupCred.username"
          placeholder="Username" />
        <button class="btn-hover-login color-10">Signup</button>
      </form>
    </div>
  </div>
  <div class="modal-bg" @click="closeModal"></div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { eventBus } from '../services/event-bus.service'
export default {
  name: 'login-signup',
  props: {
    user: {
      type: Object,
    }
  },
  data() {
    return {
      msg: '',
      loginCred: { username: null, password: '123' },
      signupCred: { username: '', password: '', fullname: '' },
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    modal() {
      const isDetailsHeader = this.$route.name === 'stay-details'
      if (isDetailsHeader)
      {
        return 'details-modal'
      } else return 'home-modal'
    },
  },


  created() {
    console.log(this.user);
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username)
      {
        this.msg = 'Please enter username/password'
        return
      }
      try
      {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred })
        this.$store.dispatch('loadTrips')

        this.$router.push('/')
      } catch (err)
      {
        console.log(err)
        this.msg = 'Failed to login'
      }
      this.closeModal()
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
      this.closeModal()
    },
    closeModal() {
      eventBus.emit('close-modal')
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username)
      {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$router.push('/')
      this.closeModal()


    },
    // loadUsers() {
    //   this.$store.dispatch({ type: "loadUsers" })
    // },
    async removeUser(userId) {
      try
      {
        await this.$store.dispatch({ type: "removeUser", userId })
        this.msg = 'User removed'
      } catch (err)
      {
        this.msg = 'Failed to remove user'
      }
    }
  }

}
</script>