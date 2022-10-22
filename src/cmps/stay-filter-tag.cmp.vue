<template>
  <div class="tags-container clickable">
    <!-- <el-carousel trigger="click" :autoplay="false"> -->
    <!-- <el-carousel-item v-for="(internalTagsList,index) in tags" :key="index"> -->
    <div :class="{ active: selectedTag === tag }" class="tag-card"
      v-for="tag in tags" :key="tag" @click="tagSelect(tag)">
      <div><img class="tag-card-img" :src="tagImage(tag)" /></div>
      <span class="tag-card-text">{{ tag }}</span>
    </div>
    <!-- </el-carousel-item> -->
    <!-- </el-carousel> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: ["Islands", 'Beach', 'Amazing pools', 'OMG', 'National parks', 'Cabins', 'Design', "Camping", 'Amazing views', 'Desert', 'Arctic', 'Tiny homes', 'Lakefront'],
      // tags: [
      //         ["Islands", 'Beach', 'Amazing pools', 'OMG', 'National parks','Cabins', 'Design', "Camping", 'Amazing views', 'Desert','Arctic', 'Tiny homes', 'Lakefront'],
      //         ['Arctic', 'Tiny homes', 'Lakefront','Surfing', 'Shared homes', 'Caves', 'Tropical', 'Bed & breakfasts', 'Earth homes','Iconic cities','Countryside','Luxe'],
      //         ['Earth homes','Iconic cities','Countryside','Luxe','Lake','A-frames','Castles','Farms','historical-homes',"City", "Boat"]
      //       ]

      selectedTag: 'Islands',
    }
  },
  methods: {
    tagImage(tag) {
      return `${import.meta.env.BASE_URL}images/airbnb-label-imgs/${tag.replace(' & ', '-').replace(' ', '-').toLowerCase()}.jpg`
    },
    // tagSelect(tag) {
    //   this.$store.dispatch({
    //     type: 'setFilterBy',
    //     filterBy: { tag: JSON.parse(JSON.stringify(tag)) },
    //   })
    // },
    tagSelect(tag) {
      this.selectedTag = tag
      // var filter = this.filter;
      // console.log(filter);
      this.$store.commit({
        type: 'setFilterBy',
        filterBy: { tag: JSON.parse(JSON.stringify(tag)) },
      });
      this.$store.dispatch('loadStays');
    },
  },
  computed: {
  },
  created() {

  },

}
</script>
