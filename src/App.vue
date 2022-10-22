<template>

  <div id="app">
    <div :class="ifSticky">
      <app-header />
      <stay-filter :class="stickyStyle" />
    </div>
    <router-view />
    <!-- <footer class="sticky-bottom" style="padding: 10px; height: 50px; ">
      <h5 style="font-family: Airbnb-medium">© 2022 Gobnb</h5>
    </footer> -->
  </div>

</template>

<script>
import appHeader from './cmps/app-header.cmp.vue'
import stayFilter from './cmps/stay-filter.cmp.vue'

export default {
  data() {
    return {
      isStickyStyle: false,
    }
  },
  created() {
    this.$store.dispatch('loadStays')
    this.$store.commit('addCurrentTrip')
    this.$store.dispatch('loadUsers')
  },
  methods: {
  },
  computed: {
    stickyStyle() {
      return this.isStickyStyle ? 'sticky-style' : 'border-top'
    },
    ifSticky() {
      const isDetailsHeader = this.$route.name === 'stay-details'
      return isDetailsHeader ? "width-100 flex flex-row" : "width-100 sticky-top flex flex-row"
    },
  },
  components: {
    appHeader,
    stayFilter,
  },
}
</script>
