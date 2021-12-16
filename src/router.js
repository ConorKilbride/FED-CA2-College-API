import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";
// import AllCourses from "./pages/Index.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    //// COURSES ////
    {
      path: "/courses",
      name: "courses_index",
      component: () => import("./pages/courses/Index.vue")
    },
    {
			path: "/courses/create",
			name: "courses_create",
			component: () => import("./pages/courses/Create.vue")
		},
    {
      path: "/courses/:id/edit",
      name: "courses_edit",
      component: () => import("./pages/courses/Edit.vue")
    },
    {
      path: "/courses/:id",
      name: "courses_show",
      component: () => import("./pages/courses/Show.vue")
    },
    //// LECTURERS ////
    {
      path: "/lecturers",
      name: "lecturers_index",
      component: () => import("./pages/lecturers/Index.vue")
    },
    {
			path: "/lecturers/create",
			name: "lecturers_create",
			component: () => import("./pages/lecturers/Create.vue")
		},
    {
      path: "/lecturers/:id/edit",
      name: "lecturers_edit",
      component: () => import("./pages/lecturers/Edit.vue")
    },
    {
      path: "/lecturers/:id",
      name: "lecturers_show",
      component: () => import("./pages/lecturers/Show.vue")
    },
    //// ENROLMENTS ////
    {
      path: "/enrolments",
      name: "enrolments_index",
      component: () => import("./pages/enrolments/Index.vue")
    },
    {
      path: "/enrolments/:id",
      name: "enrolments_show",
      component: () => import("./pages/enrolments/Show.vue")
    }
  ]
});
