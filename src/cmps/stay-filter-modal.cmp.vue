<template>


  <!-- Form -->
  <el-button text @click="dialogFormVisible = true">
    <img class="filter-icon" src="../assets/logo/filter-icon.png" alt="">
    filter
  </el-button>

  <el-dialog v-model="dialogFormVisible" title="">
    <template #header="{titleId, titleClass }">
      <div class="my-header">
        <span :id="titleId" :class="titleClass">Filters</span>
      </div>
    </template>
    <el-form>

      <div class="price-filter">
        <span class="filter-modal-title">Price range</span>
        <span class="filter-modal-title-avg">The average nightly price is
          $431</span>
        <div class="slider-demo-block">
          <el-slider @mouseover="setPrice" v-model="priceRange" range show-stops
            :min=14 :max=1600 />
        </div>
        <div class="price-container">
          <div class="price-cell">
            <div class="input-container">
              <span class="input-price"> min price </span>
              <label class="flex label-price">$
                <input class="input-price-inp" v-model.number="minPrice"
                  placeholder="Please input" clearable />
              </label>
            </div>
          </div>
          <span>-</span>
          <div class="price-cell">
            <div class="input-container">
              <span class="input-price">max price</span>
              <label class="flex label-price">$
                <input class="input-price-inp" v-model.number="maxPrice"
                  placeholder="Please input" clearable />
              </label>

            </div>
          </div>
        </div>
      </div>
      <div class="amenities-container">
        <span class="filter-modal-title">Amenities</span>
        <span class="filter-modal-essentials">Essentials</span>
        <div class="essentials-container">
          <el-checkbox v-model="amenities.TV" label="TV" size="large" />
          <el-checkbox v-model="amenities.Internet" label="Internet"
            size="large" />
          <el-checkbox v-model="amenities.Wifi" label="Wifi" size="large" />
          <el-checkbox v-model="amenities.AirConditioning"
            label="Air Conditioning" size="large" />
          <el-checkbox v-model="amenities.WheelchairAccessible"
            label="Wheelchair Accessible" size="large" />
          <el-checkbox v-model="amenities.Pool" label="Pool" size="large" />
          <el-checkbox v-model="amenities.Kitchen" label="Kitchen"
            size="large" />

        </div>
        <!-- <span style="text-decoration: underline ; cursor: pointer;"
          class="filter-modal-essentials">Show more</span> -->
      </div>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <span @click="clear">Clear all</span>
        <button class="filter-footer-btn" @click="buildFilterObj">show stays
        </button>
      </span>
    </template>

  </el-dialog>
</template>

<script lang="ts" >

import { log } from 'console'
import { reactive, ref } from 'vue'
export default {
  data() {
    return {
      dialogFormVisible: ref(false),
      formLabelWidth: '140px',
      priceRange: [14, 1600],
      filterEmnt: [],
      open1: ref(false),
      minPrice: 14,
      maxPrice: 1600,
      value: ref([14, 1600]),
      amenities: {
        TV: false,
        Internet: false,
        Wifi: false,
        AirConditioning: false,
        WheelchairAccessible: false,
        Pool: false,
        Kitchen: false,
      },
    }

  },
  props: {
  },
  methods: {
    buildFilterObj() {
      for (var amenitie in this.amenities) {
        if (this.amenities[amenitie] === true) this.filterEmnt.push(amenitie)
      }

      const filterBy = {
        byPrice: [+this.minPrice, +this.maxPrice],
        byAmenities: this.filterEmnt
      }
      this.$store.commit({
        type: 'setFilterBy',
        filterBy: filterBy,
      });
      this.$store.dispatch('loadStays');
      this.filterEmnt = []
      this.dialogFormVisible = false

    },
    setPrice() {
      this.minPrice = this.priceRange[0]
      this.maxPrice = this.priceRange[1]

    },
    clear() {
      this.minPrice = 14
      this.maxPrice = 1600
      this.priceRange = [14, 1600]
      this.amenities = {
        TV: false,
        Internet: false,
        Wifi: false,
        AirConditioning: false,
        WheelchairAccessible: false,
        Pool: false,
        Kitchen: false,
      }
    },

    filterBtn() {
      return this.$store.getters.getPrices.length
    },
  },
  computed: {
    maxPriceShow() {
      return +this.maxPrice
    }, minPriceShow() {
      return +this.minPrice
    },


  },


  created() {
  },


}







</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
