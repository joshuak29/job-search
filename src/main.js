import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faAngleUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { createPinia } from "pinia";

import "@/index.css";
import App from "@/App.vue";
import router from "@/router";
const pinia = createPinia();

library.add(faSearch);
library.add(faAngleDown);
library.add(faAngleUp);

createApp(App).use(pinia).use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
