import Vue from "vue";
import Router from "vue-router";

//pages
import Home from "@/views/Home.vue";
import UserProfile from "@/views/UserProfile.vue";
import CreateProfile from "@/views/CreateProfile.vue";
import ViewPost from "@/views/ViewPost.vue";
import BrowsePosts from "@/views/BrowsePosts.vue";
import ListPost from "@/views/ListPost.vue";
import ManagePosts from "@/views/ManagePosts.vue";
import TermsOfService from "@/views/TermsOfService.vue";
import ContactUs from "@/views/ContactUs.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "News Buff - Home",
      component: Home,
      meta: {
        accountNeeded: false,
      },
    },
    {
      path: "/Profile",
      name: "News Buff - Profile",
      component: UserProfile,
      meta: {
        accountNeeded: true,
      },
    },
    {
      path: "/CreateProfile",
      name: "News Buff - Create Profile",
      component: CreateProfile,
      meta: {
        accountNeeded: false,
      },
    },
    {
      path: "/BrowsePosts",
      name: "News Buff - Browse Posts",
      component: BrowsePosts,
      meta: {
        accountNeeded: false,
      },
    },
    {
      path: "/ListPost",
      name: "News Buff - List new Post",
      component: ListPost,
      meta: {
        accountNeeded: true,
      },
    },
    {
      path: "/ManagePosts",
      name: "News Buff - Manage Posts",
      component: ManagePosts,
      meta: {
        accountNeeded: true,
      },
    },
    {
      path: "/TermsOfService",
      name: "News Buff - Terms of Use",
      component: TermsOfService,
      meta: {
        accountNeeded: false,
      },
    },
    {
      path: "/post/:id",
      name: "News Buff - Post",
      component: ViewPost,
      meta: {
        accountNeeded: false,
      },
    },
  ],
});

export default router;
