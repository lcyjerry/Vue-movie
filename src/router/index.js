import Vue from "vue";
import VueRouter from "vue-router";
import Recommend from "components/recommend/recommend";
import Search from "components/search/search";
import MovieDetail from "components/movie-detail/movie-detail";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/recommend",
  },
  {
    path: "/recommend",
    component: Recommend,
    children: [
      {
        path: ":id",
        component: MovieDetail,
      },
    ],
  },
  {
    path: "/search",
    component: Search,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
