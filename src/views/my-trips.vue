<template>
  <div class="main-layout">
    <h2 style="marging-bottom: 15px">Trips</h2>
    <span style="marging-bottom: 15px; font-size: 18px">Upcoming
      reservations</span>

    <section class="stay-list">
      <div class="trip-card-holder" v-for="trip in myTrips" :key="trip._id">
        <div class="trip-card-img-container"><img :src="stayPreviewImage(trip)"
            class="trip-card-img" /></div>
        <div class="trip-text-container">
          <div class="trip-host-details bold">{{ trip.hostName }}
            <div style="opacity: 0.6">{{ trip.hostType }} hosted by
              {{ trip.hostedBy }}</div>
          </div>

          <div class="trip-details-container" style="align-items: center;">
            <div class="mtrip-dates">
              <div>{{ tripDates(trip.dates, 'm') }}</div>
              <div>{{ tripDates(trip.dates, 'd') }}</div>
              <div>{{ tripDates(trip.dates, 'y') }}</div>
            </div>
            <div class="vl"></div>
            <div class="mytrip-details">{{ trip.destination.address }}</div>
          </div>

          <div class="trip-footer clickable" @click="openDetails(trip.stayId)">
            <img :src="tripIcon()"
              style="width:38px; height: 34px; margin-right: 10px;" />
            <div><span class="bold">Your host details:</span><span
                class="pl-5">Gettng there, getting inside</span></div>
          </div>
        </div>
      </div>

    </section>

  </div>
</template>

<script>
import stayPreview from "../cmps/stay-preview.cmp.vue"
export default {
  data() {
    return {
      myTrips: null,
      stay: null,
      host: null,
      userId: null,
    }
  },
  components: {
    stayPreview,
  },
  created() {
    this.loadTrips()//this.$store.getters.getTrips //orders for specific user //WHYYYYYYYYYYYYYYYYYYYYYY ???
  },
  computed: {

  },
  methods: {
    tripDates(dates, datePart) {
      let tripDates = ''
      const fromDay = new Date(dates[0]).getDate()
      const fromMonth = new Date(dates[0]).toLocaleString('default', { month: 'short' })
      const fromYear = new Date(dates[0]).toLocaleString('default', { year: 'numeric' })

      const toDay = new Date(dates[1]).getDate()
      const toMonth = new Date(dates[1]).toLocaleString('default', { month: 'short' })
      const toYear = new Date(dates[0]).toLocaleString('default', { year: 'numeric' })

      // if(fromMonth === toMonth)
      // {
      //   tripDates = `${fromMonth}  ${fromDay} - ${toDay}  ${fromYear}`
      // }else{

      // }

      if (datePart === 'm')
        tripDates = fromMonth
      if (datePart === 'd')
        tripDates = `${fromDay} - ${toDay}`
      if (datePart === 'y')
        tripDates = fromYear

      return tripDates
    },
    formatedDate(date) {
      return new Date(date).toLocaleString('en-GB', { year: "numeric", day: "numeric", month: "numeric" })
    },
    async loadTrips(stayId) {
      this.myTrips = await this.$store.dispatch('loadTrips')
      console.log('loadTrips:', this.myTrips)
    },
    tripIcon() {
      return `${import.meta.env.BASE_URL}images/mytripImg.PNG`
    },
    stayPreviewImage(trip) {
      return `${import.meta.env.BASE_URL}images/${trip.stayPreviewImg}`
    }
  },
}
</script>