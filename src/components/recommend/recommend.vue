<template>
  <div class="recommend">
    <scroll class="recommend-content">
      <div class="recommend-list">
        <h1 class="list-title">近期热门电影</h1>
        <ul>
          <li class="item" @click="selectMovie(item)" v-for="item in results" :key="item.id">
            <div class="icon">
              <img width="120" height="150" :src="item.cover" />
            </div>
            <div class="text">
              <h2 class="name">{{item.title}}</h2>
              <p class="id">豆瓣ID：{{item.id}}</p>
              <p class="rate">{{item.rate}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div v-show="!results.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from "base/scroll/scroll";
import Loading from "base/loading/loading";
import axios from "axios";

export default {
  data() {
    return {
      results: [],
    };
  },

  created() {
    axios
      .get(
        "/api/j/search_subjects?type=movie&tag=热门&page_limit=30&page_start=0"
      )
      .then((res) => {
        this.results = res.data.subjects;
      });
  },

  methods: {
    selectMovie(item) {
      this.$router.push({
        path: `/recommend/${item.id}`,
      });
    },
  },

  components: {
    Scroll,
    Loading,
  },
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 120px
          width: 120px
        .text
          display: flex
          flex-direction: column
          align-items: center
          flex: 1
          line-height: 50px
          font-size: $font-size-medium
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>