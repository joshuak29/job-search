import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import JobsResultsView from "@/views/JobsResultsView.vue";
import JobView from "@/views/JobView.vue";
import TeamsView from "@/views/TeamsView.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: HomeView,
	},
	{
		path: "/jobs",
		name: "Jobs",
		component: JobsResultsView,
	},
	{
		path: "/jobs/:id",
		name: "jobListing",
		component: JobView
	},
	{
		path: "/teams",
		name: "teams",
		component: TeamsView
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior() {
		return {top: 0, left: 0, behavior: "smooth"};  //set the scroll behaviour after a route change
	}
});

export default router;