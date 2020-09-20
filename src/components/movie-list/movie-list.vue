<template>
  <div class="movie-list">
    <scroll class="movie-wrapper">
      <ul class="movie">
        <li
          @click="selectMovie(item.id)"
          class="movie-item"
          v-for="(item,index) in results"
          :key="index"
        >
          <div class="img">
            <img :src="item.img" />
          </div>
          <ul class="desc">
            <li class="name">{{item.title}}</li>
            <li class="sub">{{item.sub_title}}</li>
            <li class="year">{{item.year}}</li>
            <li class="type">{{item.type}}</li>
          </ul>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from "base/scroll/scroll";

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

  methods: {
    selectMovie(id) {
      this.$emit("selectMovie", id);
    },
  },

  components: {
    Scroll,
  },
};
</script>

<style lang="stylus" scoped>
.movie-list
  position: fixed
  top: 168px
  left: 0
  right: 0
  bottom: 0
  .movie-wrapper
    overflow: hidden
    height: 100%
    .movie-item
      margin: 20px
      display: flex
      .img
        width: 150px
        height: 200px
        img
          width: 150px
          height: 200px
      .desc
        flex: 1
        padding-left: 20px
        li
          padding-bottom: 20px
</style>