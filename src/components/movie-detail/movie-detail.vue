<template>
  <transition appear name="slide">
    <div class="movie-detail">
      <transition name="fade">
        <div v-show="data.sid">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{this.data.chinese_title}}</h1>
          <div class="bg-image" :style="bgImage"></div>
          <div class="favorite">
            <i @click="toggleFavorite(data)" class="icon" :class="getIcon"></i>
          </div>
        </div>
      </transition>
      <div v-show="!data.sid" class="loading-container">
        <loading></loading>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import Loading from "base/loading/loading";
import { saveFavorite, isFavorite, deleteFavorite } from "common/js/cache.js";

export default {
  data() {
    return {
      id: "",
      data: {},
      icon: -1,
    };
  },

  computed: {
    bgImage() {
      return `background-image:url(${this.data.poster})`;
    },

    getIcon() {
      if (this.icon === 1) {
        return "icon-favorite";
      } else {
        return "icon-not-favorite";
      }
    },
  },

  created() {
    this.id = this.$route.params.id;
    axios
      .get(
        `https://api.rhilip.info/tool/movieinfo/gen?site=douban&sid=${this.id}`
      )
      .then((res) => {
        this.data = res.data;
        if (isFavorite(this.data)) {
          this.icon = 1;
        } else {
          this.icon = -1;
        }
      });
  },

  methods: {
    back() {
      this.$router.back();
    },

    toggleFavorite(data) {
      if (isFavorite(data)) {
        deleteFavorite(data);
        this.icon = -1;
      } else {
        saveFavorite(data);
        this.icon = 1;
      }
    },

    _isFavorite(data) {
      return isFavorite(data);
    },
  },

  components: {
    Loading,
  },
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.slide-enter-active, .slide-leave-active
  transition: all 0.5s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.movie-detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: $color-background
  .fade-enter-active, .fade-leave-active
    transition: all 0.5s
  .fade-enter, .fade-leave-to
    opacity 0
  .back
    position: absolute
    z-index: 50
    left: 6px
    font-size: 24px
    color: $color-theme !important
    .icon-back
      display: block
      padding: 10px
  .title
    position: absolute
    z-index: 40
    top: 0
    left: 10%
    z-index: 40
    width: 80%
    color: #fff
    no-wrap()
    text-align: center
    line-height: 40px
    font-size: $font-size-large
  .bg-image
    position: relative
    width: 100%
    padding-top: 70%
    transform-origin: top
    background-size: cover
  .favorite
    display: flex
    justify-content: center
    align-items: center
    height: 100px
    .icon
      font-size: 30px
.loading-container
  position: absolute
  width: 100%
  top: 50%
  transform: translateY(-50%)
</style>