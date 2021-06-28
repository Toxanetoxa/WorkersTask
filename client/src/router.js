import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/Workers",
      name: "Workers",
      component: () => import("./components/WorkersList")
    },
    {
      path: "/Workers/:id",
      name: "Workers-details",
      component: () => import("./components/Workers")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddWorkers")
    }
  ]
});
