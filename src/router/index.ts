import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Vote from "../views/Vote.vue";
import Results from "../views/Results.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "create",
    component: Home
  },
  {
    path: "/vote/:pollid",
    name: "vote",
    
    component: Vote
  },
  {
    path: "/results/:pollid",
    name: "results",
  
    component: Results
  },
 
];

const router = new VueRouter({
  routes
});

export default router;
