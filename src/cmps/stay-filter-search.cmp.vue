
<template>
  <div class="main-layout">
    <nav class="main-layout search-container large-container">

      <div class="search-area large-area destination" @click="onOpenWhere"
        :class="{ active: selectedSrchArea === 'destination' }">
        <span class="large-area-span">Where</span>
        <input v-model="filterBy.country" type="text"
          placeholder="Search destinations">
      </div>

      <div class="vl"></div>
      <div class="search-area large-area date" @click="onOpenDateFrom"
        :class="{ active: selectedSrchArea === 'date-from' }">
        <span class="large-area-span">Check in</span>
        <!-- < class="picker-date from"></ -->
        <el-date-picker class="picker-date from" v-model="dates"
          type="daterange" start-placeholder="Check in" format="DD-MM-YYYY"
          value-format="x" />
      </div>
      <div class="vl"></div>

      <div class="search-area large-area date" @click="onOpenDateTo"
        :class="{ active: selectedSrchArea === 'date-to' }">
        <span class="large-area-span">Check out</span>

        <el-date-picker class="picker-date to" v-model="dates" type="daterange"
          end-placeholder="Check out" format="DD-MM-YYYY" />
      </div>

      <div class="vl"></div>

      <div class="search-area large-area guests"
        :class="{ active: selectedSrchArea === 'guests' }">
        <div @click="onOpenGuests" class="guests-placeholder">
          <span class="large-area-span">Who</span>
          <span class="search-area-text-light">Add guests</span>
        </div>

        <Transition name="fullSearch">
          <div v-if="dropOpen" class="drop-menu">
            <div class="input-num-container flex">
              <div class="drop-item flex">
                <div class="txt-drop-item flex ">
                  <span class="search-area-text-Bold">Adults</span>
                  <span class="search-area-text-light"> Ages 13 or
                    above</span>
                </div>
                <div class="input-num">
                  <button @click="decGust('adults')" class="inc-btn">-</button>
                  <span>
                    {{ adults }}
                  </span>
                  <button @click="++adults" class="inc-btn">+</button>
                </div>
              </div>
              <div class="ol"></div>
              <div class="input-num-container flex">
                <div class="drop-item flex">
                  <div class="txt-drop-item flex ">
                    <span class="search-area-text-Bold">Children</span>
                    <span class="search-area-text-light"> Ages 2–12</span>
                  </div>
                  <div class="input-num">
                    <button @click="decGust('children')"
                      class="inc-btn">-</button>
                    <span>
                      {{ children }}
                    </span>
                    <button @click="++children" class="inc-btn">+</button>
                  </div>
                </div>
              </div>
              <div class="ol"></div>

              <div class="input-num-container flex">
                <div class="drop-item flex">
                  <div class="txt-drop-item flex ">
                    <span class="search-area-text-Bold">Infants</span>
                    <span class="search-area-text-light"> Under 2</span>
                  </div>
                  <div class="input-num">
                    <button @click="decGust('infants')"
                      class="inc-btn">-</button>
                    <span>
                      {{ infants }}
                    </span>
                    <button @click="++infants" class="inc-btn">+</button>
                  </div>
                </div>
              </div>
              <div class="ol"></div>
              <div class="input-num-container flex">
                <div class="drop-item flex">
                  <div class="txt-drop-item flex ">
                    <span class="search-area-text-Bold">Pets</span>
                    <span class="search-area-text-light  "> Bringing a service
                      animal?</span>
                  </div>
                  <div class="input-num">
                    <button @click="decGust('pets')" class="inc-btn">-</button>
                    <span>
                      {{ pets }}
                    </span>
                    <button @click="++pets" class="inc-btn">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
        <div class="action-search clickable" @click="setFilterBy">
          <img class="search-icon" src=@/assets/logo/serch_icon.png alt="" />
          <span>Search</span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  data() {
    return {

      dropOpen: false,
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0,
      selectedSrchArea: 'destination',
      filterBy: {
        country: '',
      },
      dates: null,
    }
  },
  created() {
    this.trip = this.$store.getters.currentTrip
    console.log(' this.trip:', this.trip)
    // this.dates = this.trip.dates
    this.adults = this.trip.guests.adults
    this.children = this.trip.guests.children
    this.infants = this.trip.guests.infants
    this.pets = this.trip.guests.pets
  },
  methods: {
    onOpenWhere() {
      this.selectedSrchArea = 'destination'
      this.dropOpen = false

    },
    onOpenDateFrom() {
      this.selectedSrchArea = 'date-from'
      this.dropOpen = false

    },
    onOpenDateTo() {
      this.selectedSrchArea = 'date-to'
      this.dropOpen = false

    },
    onOpenGuests() {
      this.selectedSrchArea = 'guests'
      this.dropOpen = !this.dropOpen
    },
    setFilterBy() {
      this.$emit("searchClicked");
      this.dropOpen = false
      this.$store.commit({
        type: 'setFilterBy',
        filterBy: {
          country: this.filterBy.country,
        },
      })
      this.$store.dispatch({
        type: 'loadStays',
        filterBy: {
          country: this.filterBy.country,
        },
      })

      const trip = {
        destination: {
          country: this.filterBy.country

        },
        dates: this.dates,
        guests: {
          adults: this.adults,
          children: this.children,
          infants: this.infants,
          pets: this.pets
        }
      }
      this.$store.commit({
        type: "saveCurrentTrip",
        trip,
      })
      this.trip = this.$store.getters.currentTrip

    },

    decGust(guests) {
      console.log('this[guests]:', this[guests])
      if (this[guests] === 0) return
      --this[guests]
    }
  },
  computed: {
    dateSpanDisplay() {
      return !(this.selectedSrchArea === 'dateFrom' || this.selectedSrchArea === 'dateTo') ? 'display: block' : 'display: none'
    },
    datePickerDisplay() {
      return (this.selectedSrchArea === 'dateFrom' || this.selectedSrchArea === 'dateTo') ? 'display: flex' : 'display: none'
    },
  },
  unmounted() { },
}

</script>
<style scoped>
</style>