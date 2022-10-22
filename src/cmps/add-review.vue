<template >
  <h4>Add review to {{stay.host.fullname}} stay</h4>
  <textarea name="add-review" id="" cols="30" rows="10"
    v-model="newReview.txt"></textarea>
  <button @click="addReview">Add</button>
</template>

<script>
export default {
  props: {
    stay: {
      type: Object,
    }
  },
  data() {
    return {
      loginUser: null,
      newReview: {
        at: null,
        by: {
          fullname: '',
          imgUrl: '',
          _id: '',
        },
        txt: ''
      }
    }
  },
  methods: {
    async addReview() {
      this.loginUser = this.$store.getters.loggedinUser
      console.log('this.loginUser:', this.loginUser)
      // this.newReview.at = new Date()
      // this.newReview.by.fullname = this.loginUser.fullname
      // this.newReview.by.imgUrl = this.loginUser.imgUrl
      // this.newReview.by._id = this.loginUser._id
      // try
      // {
      //   await this.$store.dispatch({ type: 'addReview', review: this.newReview.txt, stay: this.stay })
      //   // showSuccessMsg('Review added')
      //   this.newReview = {
      //     at: null,
      //     by: {
      //       fullname: '',
      //       imgUrl: '',
      //       _id: '',
      //     },
      //     txt: ''
      //   }
      // } catch (err)
      // {
      //   // showErrorMsg('Cannot add review')
      // }
    }

  },
  computed: {

  },
  created() {
    this.loginUser = this.$store.getters.loggedinUser
    console.log('this.loginUser:', this.loginUser)
  },
}
</script>
