<template>
  <div class="movie-list">
    <ul class="movie">
      <li class="movie-item" v-for="(item,index) in results" :key="index">
        <div class="img">
          <img :src="item.img"/>
        </div>
        <ul class="desc">
          <li class="name">{{item.title}}</li>
          <li class="sub">{{item.sub_title}}</li>
          <li class="year">{{item.year}}</li>
          <li class="type">{{item.type}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    results: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="stylus" scoped>
.movie-list
  .movie-item
    margin 20px
    display flex
    .img
      width:150px
      height 200px
      img 
        width 150px
        height 200px
    .desc
      flex 1
      padding-left 20px
      li
        padding-bottom 20px
</style>