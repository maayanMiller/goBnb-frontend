<template>
  <section class="host-details">

    <div class="flex">
      <div class="left-host">
        <div class="pic-holder">
          <div class="host-pic-txt">
            <h3>Hosted by {{ stay.host.fullname }}</h3>
            <h4>Joined in {{ date(new Date(stay.reviews[0].at)) }}</h4>
          </div>
          <img :src="stay.host.pictureUrl" v-if="stay.host.pictureUrl">
        </div>
        <h5><img class="star" src="../assets/logo/starAirbnb.svg"> {{ stay.numOfReviews}} Reviews</h5>

        <h5 class="superhost" v-if="stay.host.isSuperhost">
          <img src="../assets/logo/superHost.png"> Superhost
        </h5>
        <p>{{ stay.host.about }}</p>
      </div>
      <div class="right-host">
        <div class="host-txt">
          <p v-if="stay.host.language">Language: {{ stay.host.language }}</p>
          <p v-else>Language: English</p>
          <p>Response rate: 100%</p>
          <p> Response time: {{ stay.host.responseTime }} </p>
          <div class="contact-btn" @click="contact">Contact Host</div>
        </div>
        <div class="protect-holder">
          <img src="../assets/logo/protect-paymeent.svg" alt="">
          <span>To protect your payment, never transfer money or communicate outside of the Airbnb website or
            app.</span>
        </div>
      </div>
    </div>
  </section>
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
    }
  },
  methods: {
    date(date) {
      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const intMonth = date.getMonth() + 1
      const year = date.getYear() + 1900
      return `${month[intMonth]}  ${year}`
    },
    contact() {
      const host = this.stay.host
      this.$router.push(`/chat/${host.fullname}`)
    }
  },
  computed: {
  },
  created() {
  },
}
</script>
