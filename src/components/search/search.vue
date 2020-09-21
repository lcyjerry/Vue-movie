<template>
  <div class="search">
    <div class="search-wrapper">
      <div class="search-box">
        <i class="icon-search"></i>
        <input class="box" v-model="query" />
        <i v-show="query" @click="clear" class="icon-dismiss"></i>
      </div>
    </div>
    <transition name="fade">
      <movie-list @selectMovie="MovieDetail" :results="results" v-show="show"></movie-list>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
import MovieList from "components/movie-list/movie-list";
import axios from "axios";
import { debounce } from "common/js/util";

export default {
  data() {
    return {
      query: "",
      results: [],
      show: false,
    };
  },

  components: {
    MovieList,
  },

  created() {
    this.$watch(
      "query",
      debounce((newQuery) => {
        if (newQuery !== "") {
          this.search(newQuery);
        } else {
          this.show = false;
        }
      }, 800)
    );
  },

  methods: {
    clear() {
      this.query = "";
      this.show = false;
    },

    search(val) {
      const data = {
        q: val,
      };
      return axios
        .get("/api/j/subject_suggest?", {
          params: data,
        })
        .then((res) => {
          this.results = res.data;
          this.show = true;
        });
    },

    MovieDetail(id) {
      this.$router.push({
        path: `/search/${id}`,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.search
  .search-wrapper
    margin: 20px
    .search-box
      display: flex
      align-items: center
      box-sizing: border-box
      width: 100%
      padding: 0 6px
      height: 40px
      background: $color-highlight-background
      border-radius: 6px
      .icon-search
        font-size: 24px
        color: $color-background
      .box
        flex: 1
        margin: 0 5px
        line-height: 18px
        background: $color-highlight-background
        color: $color-text
        font-size: $font-size-medium
        outline: 0
        &::placeholder
          color: $color-text-d
      .icon-dismiss
        font-size: 16px
        color: $color-background
  .fade-enter-active, .fade-leave-active
    transition: all 0.5s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>