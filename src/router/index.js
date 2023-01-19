import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import JobsResultsView from "@/views/JobsResultsView.vue";
import JobView from "@/views/JobView.vue";

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
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;