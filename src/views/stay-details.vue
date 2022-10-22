<template >
    <section class="details-layout" v-if="stay">

        <h2 class="details-title">{{ stay.name }}</h2>
        <div class="links-line">
            <div class="start-links">
                <a href=""><img class="star"
                        src="../assets/logo/starAirbnb.svg"> {{
                        stay.reviewScores.rating / 20
                        }}</a>
                <span>•</span>
                <a href="">{{ stay.numOfReviews }} reviews</a>
                <span class="superhost"
                    v-if="stay.host.isSuperhost"><span>•</span>
                    <img src="../assets/logo/superHost.png"> Superhost
                </span>
                <span>•</span>
                <a href="">{{ stay.host.location }}</a>
            </div>
            <div class="end-links">
                <div class="shareBtn">
                    <img src="../assets/logo/shareAirbnb.svg" alt="">
                    <a href="">Share</a>
                </div>
                <div class="saveBtn">
                    <img src="../assets/logo/saveAirbnb.svg" alt="">
                    <a href="">Save</a>
                </div>
            </div>
        </div>
        <div class="images-holder ">

            <img :src="imgUrl(stay.imgUrls[0])" alt="">
            <img :src="imgUrl(stay.imgUrls[1])" alt="">
            <img :src="imgUrl(stay.imgUrls[2])" alt="">
            <img :src="imgUrl(stay.imgUrls[3])" alt="">
            <img :src="imgUrl(stay.imgUrls[4])" alt="">

        </div>
        <div :class="showDetailsHeader" class="details-header">
            <div class="details-header-nav-container">
                <span class="details-header-nav">Photos</span>
                <span class="details-header-nav">Amenities</span>
                <span class="details-header-nav">location</span>
            </div>
            <div class="header-margin"></div>
            <div :class="showBtnHeader" class="details-header-btn-container">
                <div class="details-header-txt">
                    <span class="details-header-span-bold">${{ stay.price }}
                        <span class="details-header-span"> night</span>
                    </span>
                    <div>
                        <a class="details-header-reviews" href=""><img
                                class="star"
                                src="../assets/logo/starAirbnb.svg"> {{
                                stay.reviewScores.rating / 20
                                }}</a>
                        <span class="details-header-reviews"> •</span>
                        <a class="details-header-reviews-link" href="">{{
                        reviews
                        }}
                            reviews</a>
                    </div>
                </div>
                <button class="details-header-btn">Reserve</button>

            </div>
        </div>
        <div class=" hl detailes-line full" :class="showDetailsHeader"></div>



        <div class="main-grid-container">

            <section class="left-bar">
                <div class="host-holder">

                    <div class="hosted-by-txt">
                        <h2>{{ stay.propertyType }} hosted by {{
                        stay.host.fullname
                        }}</h2>
                        <h3>{{ stay.capacity }} guests</h3><span> • </span>
                        <h3>{{ bedrooms }}</h3><span> • </span>
                        <h3>{{ stay.beds }} beds</h3><span> • </span>
                        <h3>{{ stay.bathrooms }} bath</h3>
                    </div>
                    <img class="host-img" :src="stay.host.pictureUrl"
                        alt="hostPic">
                </div>

                <div class="highligths">
                    <div class="superhost-txt flex"
                        v-if="stay.host.isSuperhost">

                        <img src="../assets/logo/superhostHl.svg">
                        <div class="txt-holder">
                            <h2>{{ stay.host.fullname }} is a Superhost</h2>
                            <p>Superhosts are experienced, highly rated hosts
                                who are committed to providing great stays
                                for
                                gues
                            </p>
                        </div>
                    </div>
                    <div class="locTxt flex"
                        v-if="stay.reviewScores.location >= 9">
                        <img src="../assets/logo/locationHl.svg">
                        <div class="txt-holder">
                            <h2>Great location</h2>
                            <p>{{ stay.reviewScores.location * 10 }}% of recent
                                guests gave the location a 5-star
                                rating.
                            </p>
                        </div>
                    </div>
                    <div class="commTxt flex"
                        v-if="stay.reviewScores.communication >= 9">
                        <img src="../assets/logo/communicationHl.svg">
                        <div class="txt-holder">
                            <h2>Great communication</h2>
                            <p>{{ stay.reviewScores.communication * 10 }}% of
                                recent guests rated Jean-Baptiste 5-star
                                in
                                communication.
                            </p>
                        </div>
                    </div>
                    <div class="parkingTxt flex"
                        v-if="stay.reviewScores.location < 7.5">
                        <img src="../assets/logo/freeParkHl.svg">
                        <div class="txt-holder">
                            <h2>Park for free</h2>
                            <p>This is one of the few places in the area with
                                free parking.</p>
                        </div>
                    </div>
                    <div class="flex">
                        <img class="static" src="../assets/logo/freeCanHl.svg">
                        <div class="txt-holder">
                            <h2 class="free-can-txt">Free cancellation for 48
                                hours.</h2>
                        </div>
                    </div>
                </div>

                <div class="coverTxt">
                    <h2><span>air</span>cover</h2>
                    <p>Every booking includes free protection from Host
                        cancellations, listing inaccuracies, and other
                        issues like trouble checking in.</p>
                    <a class="href-more">Learn more</a>
                </div>
                <div class="summary-holder">
                    <p class="summary">{{ stay.summary }}</p>
                    <a class="href-more">Show more <img
                            src="../assets/logo/reed-more-row.svg" alt=""></a>
                </div>

                <div class="amenities">
                    <h2>What this place offers</h2>
                    <ul>
                        <li v-for=" (ament) in stay.amenities.slice(0, 7)"
                            :key="ament">{{ ament }}</li>
                    </ul>
                    <div class="show-all-btn">
                        Show all {{ stay.amenities.length - 7 }} amenities
                    </div>
                </div>
            </section>
            <div class="right-bar">
                <trip-details :stay="stay" />
            </div>
        </div>
        <stay-reviews :stay="stay" />
        <host-details :stay="stay" />

    </section>


</template>

<script >
import tripDetails from '../cmps/trip-details.vue'
import stayReviews from '../cmps/stay-reviews.vue'
import hostDetails from '../cmps/host-details.cmp.vue'
import { eventBus } from '../services/event-bus.service'

export default {
    data() {
        return {
            stay: null,
            posY: 0,
        }
    },
    methods: {
        async getStayById(stayId) {
            this.stay = await this.$store.dispatch({ type: 'getStayById', stayId })
        },
        imgUrl(imgName) {
            return `${import.meta.env.BASE_URL}images/${imgName}`
        },
        updatePosition(event) {
            this.posY = window.scrollY
        },
    },
    computed: {
        bedrooms() {
            const bedrooms = +this.stay.bedrooms
            return (bedrooms > 1) ? bedrooms + '\ bedrooms' : bedrooms + '\ bedroom'
        },
        showDetailsHeader() {
            if (this.posY > 650) return 'show-details-header'
        },
        showBtnHeader() {
            if (this.posY > 1700) return 'show-btn-header'
        }
    },
    created() {
        var stayId = this.$route.params.id
        this.getStayById(stayId)
        window.addEventListener("scroll", this.updatePosition)

    },
    destroyed() {
        window.removeEventListener("scroll", this.updatePosition);
    },
    components: { tripDetails, stayReviews, hostDetails }
}
</script>

<style>
</style>
