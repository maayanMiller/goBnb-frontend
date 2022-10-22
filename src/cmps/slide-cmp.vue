<template  class=" clickable">
  <div class="mySlides fade">
    <div class="numbertext">1</div>
    <img class="slide-img" :src="fullImageUrl">
    <div class="text">Caption Text</div>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
    }
  },
  methods: {

  },
  computed: {
    fullImageUrl() {
      return `src/images/${this.imageUrl}`
    },
  },
  created() {
  },
}
</script>
