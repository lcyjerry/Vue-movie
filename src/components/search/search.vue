<template>
  <div class="search">
    <div class="search-wrapper">
      <i class="icon-search"></i>
      <input class="search-box" v-model="query" />
      <i v-show="query" @click="clear" class="icon-dismiss"></i>
    </div>
    <movie-list :results="results"></movie-list>
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
    };
  },

  components: {
    MovieList,
  },

  created() {
    this.$watch(
      "query",
      debounce((newQuery) => {
        this.search(newQuery);
      }, 800)
    );
  },

  methods: {
    clear() {
      this.query = "";
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
          console.log(res);
          this.results = res.data;
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.search
  .search-wrapper
    display: flex
    align-items: center
    margin: 20px
    height: 40px
    padding: 0 14px
    line-height: 40px
    background-color: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: #222
    .search-box
      flex: 1
      height: 30px
      line-height: 30px
      background-color: #333
      font-size: $font-size-medium
      outline: 0
    .icon-dismiss
      font-size: 20px
      color: #222
</style>