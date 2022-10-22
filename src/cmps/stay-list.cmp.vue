<template>
  <div class=" list-container main-layout">
    <section class="stay-list">
      <!-- <button @click="toAddStay()">Add Stay</button> -->
      <!-- clean-list stay-list-layout">> -->
      <stay-preview class="preview-layout clickable" v-for="stay in stays"
        :key="stay._id" :stay="stay" />
    </section>
  </div>
</template>

<script>
import stayPreview from "./stay-preview.cmp.vue"

export default {
  props: {
    stays: {
      type: Array,
      requered: true,
      default: []
    }
  },

  components: {
    stayPreview,
  },
  methods: {
    toAddStay() {
      this.$router.push("/stay/edit")
    },
  },
  created() {



  },
  unmounted() {
  },
}
</script>