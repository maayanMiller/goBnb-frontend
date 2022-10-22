<template>
  <section class="stay-preview" @click="showStayDetails">

    <el-carousel trigger="click" :autoplay="false">
      <el-carousel-item v-for="(img) in stay.imgUrls" :key="img">
        <div @click.stop="addToWishList" class="hurt-container">
          <svg class="svg-heart" style="width:24px;height:24px" viewBox="0 0 24 24">
            <path :fill="currentColor"
              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
            </path>
          </svg>
        </div>
        <div class="img-container">
          <img class="preview-img-carusela" :src="imgUrl + 'images/' + img" />
        </div>
      </el-carousel-item>
    </el-carousel>

    <div class="stay-preview-info-container">
      <div class="flex space-between">
        <span class="bold">{{ propertyTypeAndLocation }} </span>
        <div class="flex space-between" style="align-items: center;">
          <!-- <img src="src/images/star.svg" /> -->
          <img src="../assets/logo/starAirbnb.svg" style="width: 12px;height: 12px" />
          <span style="padding-left:4px">{{ rating }}</span>
          <span v-if="isFiltered" style="padding-left:5px">{{ reviews }}</span>
        </div>
      </div>
      <span style="opacity: 0.6">{{ stay.propertyType }} • {{ stay.roomType }}</span><br />
      <span style="opacity: 0.6">{{ stay.beds }} beds • {{ stay.bedrooms }} bedrooms</span>
      <div class="bold" style="    height: 30px;
    align-content: inherit;
    display: block;
    padding-top: 8px">${{ stay.price }} night</div>
    </div>

  </section>
</template>

<script>

import slide from './slide-cmp.vue';

export default {
  name: 'StayPrevew',
  props: {
    stay: {
      type: Object,
    },
  //  stayId: {
    //  type: String,
  //  }
  },
  data() {
    return {
      slideIndex: 0,
      hurtColor: '#423f3d',
      isFiltered: false,
      trip: null,
    }
  },
  components: {
    slide,
  },
  computed: {
    propertyTypeAndLocation() {
      let propertyDesc = ''
      // if (this.stay.propertyType)
      // {
      //   propertyDesc = this.stay.propertyType
      //   if (this.stay.address.city)
      //     propertyDesc += ` in `
      // }
      if (this.stay.address.city) {
        propertyDesc += `${this.stay.address.city}`
        if (this.stay.address.country)
          propertyDesc += `, `
      }

      if (this.stay.address.country)
        propertyDesc += `${this.stay.address.country}`

      return propertyDesc
    },
    intraval() {
      return 0
    },
    imgUrl() {
      return import.meta.env.BASE_URL
    },
    rating() {
      let rating = this.stay.reviewScores.rating / 20
      return (rating === 5) ? `${rating}.0` : rating
    },
    reviews() {
      let reviewsCount = 0
      if (this.stay.reviews)
        reviewsCount = this.stay.reviews.length

      const reviews = (reviewsCount === 0) ? '' : ` (${reviewsCount})`
      return reviews
    },
    currentColor() {
      return this.hurtColor
    }
  },
  created() {
    this.filterBy = this.$store.getters.filterBy
    this.trip = this.$store.getters.currentTrip
    this.isFiltered = (((this.filterBy !== undefined) && (this.filterBy !== null)) ||
      ((this.trip !== undefined) && (this.trip !== null))
    )
  },
  unmounted() {
  },
  methods: {
    showStayDetails() {
      this.$router.push("/stay/" + this.stay._id)
    },
    addToWishList() {
      // this.hurtColor = '#423f3d' ? 'red' : '#423f3d'
      this.hurtColor = this.hurtColor === 'red' ? '#423f3d' : 'red'
    },
  },
};
</script>

<style scoped>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
