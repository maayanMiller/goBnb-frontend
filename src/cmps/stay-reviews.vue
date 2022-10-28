<template>
  <section class="main-reviews-container">
    <h2 class="title">★ {{ stay.reviewScores.rating / 20 }}<span> • </span>{{
        stay.reviews.length
    }} reviews </h2>
    <div class="reviews-bars">
      <div class="left-rev">

        <div class="cleanliness-bar holder">
          <h4>Cleanliness</h4>
          <div class="bar-and-num">

            <div class="bar">
              <div class="fill" :style="style('cleanliness')"></div>
            </div>
            <span>{{ fixedNum(stay.reviewScores.cleanliness) }}</span>
          </div>


        </div>


        <div class="communication-bar holder">
          <h4>Communication</h4>
          <div class="bar-and-num">

            <div class="bar">
              <div class="fill" :style="style('communication')"></div>
            </div>
            <span>{{ fixedNum(stay.reviewScores.communication) }}</span>
          </div>

        </div>

        <div class="checkin-bar holder">
          <h4>Check-in</h4>
          <div class="bar-and-num">

            <div class="bar">
              <div class="fill" :style="style('checkin')"></div>
            </div>

            <span>{{ fixedNum(stay.reviewScores.checkin) }}</span>
          </div>
        </div>

      </div>

      <div class="right-rev">

        <div class="accuracy-bar holder">
          <h4>Accuracy</h4>
          <div class="bar-and-num">

            <div class="bar">
              <div class="fill" :style="style('accuracy')"></div>
            </div>
            <span>{{ fixedNum(stay.reviewScores.accuracy) }}</span>
          </div>

        </div>

        <div class="location-bar holder">
          <h4>Location</h4>
          <div class="bar-and-num">

            <div class="bar">
              <div class="fill" :style="style('location')"></div>
            </div>
            <span>{{ fixedNum(stay.reviewScores.location) }}</span>
          </div>

        </div>

        <div class="value-bar holder">
          <h4>Value</h4>
          <div class="bar-and-num">

            <div class="bar">
              <div class="fill" :style="style('value')"></div>
            </div>
            <span>{{ fixedNum(stay.reviewScores.value) }}</span>
          </div>

        </div>

      </div>
    </div>
    <div class="reviews">
      <div class="review" v-for="rev in stay.reviews.slice(0, 6)" :key="rev">
        <div class="rev-head">
          <img :src="reviewerImg(rev)" alt="">
          <div class="rev-title">
            <h4 class="name">{{ rev.by.fullname }}</h4>
            <h5 class="date">{{ date(new Date(rev.at)) }}</h5>
          </div>
        </div>
        <p v-if="rev.txt.length < 180" class="rev">{{ rev.txt }}</p>
        <p v-else class="rev">{{ rev.txt.slice(0, 175) }}...
          <a class="href-more" href="">Show more <img
              src="../assets/logo/reed-more-row.svg" alt=""></a>
        </p>
      </div>
    </div>
    <div class="show-all-btn">
      Show all {{ stay.reviews.length - 6 }} reviews
    </div>
    <div class="show-all-btn">
      Add review
    </div>
  </section>
  <add-review :stay="stay" />
  <!-- <addReview :stay="stay"></addReview> -->
</template>

<script>
import addReview from '../cmps/add-review.vue'
import { utilService } from '../services/util.service.js'
export default {
  components: {
    addReview,
  },
  props: {
    stay: {
      type: Object,
    }
  },
  data() {
    return {
      userImageIndex: 1,
      reviewsLength: null,
    }
  },
  methods: {
    style(rev) {
      return 'width:' + this.stay.reviewScores[rev] * 10 + '%'
    },
    fixedNum(num) {
      num = num * 0.5
      return num.toFixed(1)
    },
    date(date) {
      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const intMonth = date.getMonth()
      const year = date.getYear() + 1900
      return `${month[intMonth]}  ${year}`
    },
    updateImgIndex() {
      this.userImageIndex = utilService.getRandomInt(1, 100)
    },
    reviewerImg(rev) {
      if (rev.by.imgUrl) return rev.by.imgUrl
      const index = utilService.getRandomInt(1, 100)
      const gender = (utilService.getRandomInt(1, 100) % 2 === 0) ? 'men' : 'women'
      return `https://randomuser.me/api/portraits/${gender}/${index}.jpg`
    },
  },
  computed: {
  },
  created() {
    this.reviewsLength = this.stay.reviews.length;
  },
}
</script>
