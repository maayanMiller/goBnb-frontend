<template>
  <section v-if="stay" class="trip-details-holder">
    <div class="trip-details">

      <div class="price-tag">
        <div class="">
          <span class="price-for-night">{{ priceForNight }} </span>
          <span> night</span>
        </div>
      </div>

      <div class="trip-order-container">
        <div class="date-details">
          <div @click="onOpenDateFrom" class="date-details-cell">
            <span class="check">Check in</span>
            <!-- < class="picker-date from"></ -->
            <el-date-picker class="picker-date from" v-model="trip.dates"
              type="daterange" start-placeholder="Check in" />
          </div>

          <div @click="onOpenDateTo" class="date-details-cell">
            <span class="check">Check out</span>

            <el-date-picker @click="show = true"
              class="picker-date to bold-trip" v-model="trip.dates"
              type="daterange" end-placeholder="Check out" />
          </div>
        </div>
        <div class="gusts-details-container">
          <div class="gusts-details">
            <span class="check">GUESTS</span>
            <span class="bold-trip">{{ hm }}</span>
          </div>
          <div @click="dropOpen = !dropOpen" class="btn-arrow-details"><img
              class="icon-arrow" src="../assets/logo/down-arrow.png" alt="">
          </div>
        </div>
        <Transition name="fullSearch">
          <div v-if="dropOpen" class="drop-menu-details">
            <div class="input-num-container-details flex">
              <div class="drop-item-details flex">
                <div class="txt-drop-item-details flex ">
                  <span class="search-area-text-Bold-details">Adults</span>
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
              <div class="input-num-container-details flex">
                <div class="drop-item-details flex">
                  <div class="txt-drop-item-details flex ">
                    <span class="search-area-text-Bold-details">Children</span>
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

              <div class="input-num-container-details flex">
                <div class="drop-item-details flex">
                  <div class="txt-drop-item-details flex ">
                    <span class="search-area-text-Bold-details">Infants</span>
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
              <div class="input-num-container-details flex">
                <div class="drop-item-details flex">
                  <div class="txt-drop-item-details flex ">
                    <span class="search-area-text-Bold-details">Pets</span>
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

              <div class="input-num-container-details flex">
                <div class="drop-item-details flex">
                  <div class="txt-drop-item flex ">
                    <p class="stay-desc-details">This place has a maximum of 6
                      guests, not including
                      infants. If you're bringing more than 2 pets, please let
                      your host know.</p>
                  </div>

                </div>
              </div>
              <div @click="dropOpen = !dropOpen" class="close-drop">Close</div>
            </div>
          </div>
        </Transition>
      </div>



      <div @click="reserve">
        <div class="btn-container">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="content">
            <button class="action-btn">
              <span>Reserve</span>
            </button>
          </div>
        </div>
      </div>



      <el-dialog v-model="dialogVisible" width="30%">
        <svg class="svg-logo">
          <path
            d="M29.3864 22.7101C29.2429 22.3073 29.0752 21.9176 28.9157 21.5565C28.6701 21.0011 28.4129 20.4446 28.1641 19.9067L28.1444 19.864C25.9255 15.0589 23.5439 10.1881 21.0659 5.38701L20.9607 5.18316C20.7079 4.69289 20.4466 4.18596 20.1784 3.68786C19.8604 3.0575 19.4745 2.4636 19.0276 1.91668C18.5245 1.31651 17.8956 0.833822 17.1853 0.502654C16.475 0.171486 15.7005 -9.83959e-05 14.9165 4.23317e-08C14.1325 9.84805e-05 13.3581 0.171877 12.6478 0.503224C11.9376 0.834571 11.3088 1.31742 10.8059 1.91771C10.3595 2.46476 9.97383 3.05853 9.65572 3.68858C9.38521 4.19115 9.12145 4.70278 8.8664 5.19757L8.76872 5.38696C6.29061 10.1884 3.90903 15.0592 1.69015 19.8639L1.65782 19.9338C1.41334 20.463 1.16057 21.0102 0.919073 21.5563C0.75949 21.9171 0.592009 22.3065 0.448355 22.7103C0.0369063 23.8104 -0.094204 24.9953 0.0668098 26.1585C0.237562 27.334 0.713008 28.4447 1.44606 29.3804C2.17911 30.3161 3.14434 31.0444 4.24614 31.4932C5.07835 31.8299 5.96818 32.002 6.86616 32C7.14824 31.9999 7.43008 31.9835 7.71027 31.9509C8.846 31.8062 9.94136 31.4366 10.9321 30.8639C12.2317 30.1338 13.5152 29.0638 14.9173 27.5348C16.3194 29.0638 17.6029 30.1338 18.9025 30.8639C19.8932 31.4367 20.9886 31.8062 22.1243 31.9509C22.4045 31.9835 22.6864 31.9999 22.9685 32C23.8664 32.002 24.7561 31.8299 25.5883 31.4932C26.6901 31.0444 27.6554 30.3161 28.3885 29.3804C29.1216 28.4447 29.5971 27.3341 29.7679 26.1585C29.9287 24.9952 29.7976 23.8103 29.3864 22.7101ZM14.9173 24.377C13.1816 22.1769 12.0678 20.1338 11.677 18.421C11.5169 17.7792 11.4791 17.1131 11.5656 16.4573C11.6339 15.9766 11.8105 15.5176 12.0821 15.1148C12.4163 14.6814 12.8458 14.3304 13.3374 14.0889C13.829 13.8475 14.3696 13.7219 14.9175 13.7219C15.4655 13.722 16.006 13.8476 16.4976 14.0892C16.9892 14.3307 17.4186 14.6817 17.7528 15.1151C18.0244 15.5181 18.201 15.9771 18.2693 16.4579C18.3556 17.114 18.3177 17.7803 18.1573 18.4223C17.7661 20.1349 16.6526 22.1774 14.9173 24.377ZM27.7406 25.8689C27.6212 26.6908 27.2887 27.4674 26.7762 28.1216C26.2636 28.7759 25.5887 29.2852 24.8183 29.599C24.0393 29.9111 23.1939 30.0217 22.3607 29.9205C21.4946 29.8089 20.6599 29.5239 19.9069 29.0824C18.7501 28.4325 17.5791 27.4348 16.2614 25.9712C18.3591 23.3846 19.669 21.0005 20.154 18.877C20.3723 17.984 20.4196 17.0579 20.2935 16.1475C20.1791 15.3632 19.8879 14.615 19.4419 13.9593C18.9194 13.2519 18.2378 12.6768 17.452 12.2805C16.6661 11.8842 15.798 11.6777 14.9175 11.6777C14.0371 11.6777 13.1689 11.8841 12.383 12.2803C11.5971 12.6765 10.9155 13.2515 10.393 13.9589C9.94707 14.6144 9.65591 15.3624 9.5414 16.1465C9.41524 17.0566 9.4623 17.9822 9.68011 18.8749C10.1648 20.9993 11.4748 23.384 13.5732 25.9714C12.2555 27.4348 11.0845 28.4325 9.92769 29.0825C9.17468 29.5239 8.34007 29.809 7.47395 29.9205C6.64065 30.0217 5.79525 29.9111 5.0162 29.599C4.24581 29.2852 3.57092 28.7759 3.05838 28.1217C2.54585 27.4674 2.21345 26.6908 2.09411 25.8689C1.97932 25.0334 2.07701 24.1825 2.37818 23.3946C2.49266 23.0728 2.62663 22.757 2.7926 22.3818C3.0274 21.851 3.27657 21.3115 3.51759 20.7898L3.54996 20.7197C5.75643 15.9419 8.12481 11.0982 10.5894 6.32294L10.6875 6.13283C10.9384 5.64601 11.1979 5.14267 11.4597 4.6563C11.7101 4.15501 12.0132 3.68171 12.3639 3.2444C12.6746 2.86903 13.0646 2.56681 13.5059 2.35934C13.9473 2.15186 14.4291 2.04426 14.9169 2.04422C15.4047 2.04418 15.8866 2.15171 16.3279 2.35911C16.7693 2.56651 17.1593 2.86867 17.4701 3.24399C17.821 3.68097 18.1242 4.15411 18.3744 4.65538C18.6338 5.13742 18.891 5.63623 19.1398 6.11858L19.2452 6.32315C21.7097 11.0979 24.078 15.9415 26.2847 20.7201L26.3046 20.7631C26.5498 21.2936 26.8033 21.8419 27.042 22.382C27.2082 22.7577 27.3424 23.0738 27.4566 23.3944C27.7576 24.1824 27.8553 25.0333 27.7406 25.8689Z">
          </path>
        </svg>
        <div class="reservation">
          <h2>You're going to {{ stay.address.city }}!</h2>
          <!-- <div class="txt-holder"> </div> -->
          <h3 class="code-holder">Reservation Code: <span
              class="code-reservation"> {{ reservationCode }}</span></h3>


          <div class="host-info-modal-container">
            <div class="img-txt-holder-left-bar">
              <img :src="stay.host.pictureUrl" alt="" srcset="">
              <span class="host-reservation">your host is {{ stay.host.fullname
              }}</span>
            </div>
            <span class="info-reservation-right-bar"> Thank you so much for
              choosing to stay
              with us! We’ll send you
              more information about check-in when your reservation date is
              sooner.
              In the meantime, if you feel like you have any questions or
              concerns,
              feel free to let us know, and we will do our best to accommodate
              you.</span>

          </div>

        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="goToMyTrip()">Ok
            </el-button>
          </span>
        </template>
      </el-dialog>




      <div class="trip-message">You won't be charget yet</div>

      <div :class="none" class="trip-footer">
        <div class="trip-fee">
          <span class="price-line">${{ stayPrice }} x {{ nights }} nights</span>
          <span class="price-total"> ${{ tripPrice }}</span>
        </div>

        <div class="trip-fee">
          <span class="price-line">Service fee</span>
          <span class="price-total">{{ serviceFee }}</span>
        </div>
        <div class="trip-fee total">
          <span>Total</span>
          <span>${{ tripTotalPrice }}</span>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { makeId } from '../services/util.service'
export default {
  props: {
    stay: {
      type: Object,
    }
  },
  data() {
    return {
      reservationCode: null,
      //logedUser: null,

      show: false,
      trip: null,
      dates: null,
      dropOpen: false,
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0,
      stayPrice: 0,
      hurtColor: '#423f3d',
      fee: 0,
      TotalDays: 0,
      totalPrice: 0,
      dialogVisible: ref(false)
    }
  },
  methods: {
    reserve() {
      const trip = {
        stayId: this.stay._id,
        hostId: this.stay.host._id, //use "id" instead of mongoDB "_id", this way we will control its value
        hostName: this.stay.name,
        hostedBy: this.stay.host.fullname,
        hostType: this.stay.propertyType,
        stayPreviewImg: this.stay.imgUrls[0],
        orderDate: new Date(),
        dates: this.trip.dates,
        price: this.tripTotalPrice,
        status: "pending",
        guests: {
          adults: this.adults,
          children: this.children,
          infants: this.infants,
          pets: this.pets
        },
        destination: { country: this.stay.address.country, address: this.stay.address.street },
        //mainGuest information would be added in the backend from loggedinUser
      }

      this.$store.dispatch({
        type: "saveOrder",
        trip,
      })

      this.dialogVisible = true
    },
    goToMyTrip() {
      this.dialogVisible = false
      this.$router.push("/myTrips")
    },
    decGust(guests) {
      console.log('this[guests]:', this[guests])
      if (this[guests] === 0) return
      --this[guests]
    },
    setDates() {
      if (!this.trip || !this.trip.dates || this.trip.dates.length === 0)
      {
        let dateFrom = new Date()
        let dateTo = new Date()

        dateFrom = dateFrom.setDate(dateFrom.getDate() + 7)
        dateTo = dateTo.setDate(dateTo.getDate() + 10)

        this.$store.commit({ type: "setCurrentTripDates", dates: [dateFrom, dateTo] })
      }
    },
    getNights() {
      const dateFrom = new Date(this.trip.dates[0])
      const dateTo = new Date(this.trip.dates[1])
      const difference = dateTo.getTime() - dateFrom.getTime()
      return (Math.ceil(difference / (1000 * 3600 * 24)))
    }
  },
  computed: {
    priceForNight() {
      return `$${this.stayPrice}`
    },
    imgUrl(imgName) {
      return `src/images/${imgName}`
    },
    hm() {
      return `${this.adults + this.children}`
    },
    nights() {
      const nights = this.getNights()
      return nights
    },
    tripPrice() {
      const price = Math.ceil(this.getNights() * this.stayPrice)
      return price
    },
    serviceFee() {
      return `$${this.fee}`
    },
    tripTotalPrice() {
      let totalPrice = this.getNights() * this.stayPrice + this.fee
      totalPrice = `${Math.ceil(totalPrice).toLocaleString()}`
      return totalPrice
    },
    none() {
      if (this.TotalDays === 0) return 'none'
    },

    arrowDirection() {
      let srcDown = "../assets/logo/down-arrow.png"
      let srcUp = "'../assets/logo/up-arrow.png'"
      if (!this.dropOpen) return srcDown
      if (this.dropOpen) return srcUp
    }
  },
  created() {
    this.setDates()
    this.trip = this.$store.getters.currentTrip
    this.TotalDays = this.getNights()
    this.stayPrice = this.stay.price
    this.fee = Math.round(this.stayPrice * 1.17)
    this.adults = (this.trip.guests.adults === 0) ? 1 : this.trip.guests.adults
    this.children = this.trip.guests.children
    this.infants = this.trip.guests.infants
    this.reservationCode = makeId(9)
    this.pets = this.trip.guests.pets
  },
}
</script>
