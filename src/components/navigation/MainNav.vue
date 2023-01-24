<template>
  <header :class="['w-full', 'text-sm', 'h-16', { 'h-32': isLoggedIn }]">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-xl"
          >Kigali Careers</router-link
        >
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li class="h-full">
              <router-link class="flex h-full items-center py-2.5" to="/teams">Teams</router-link>
            </li>
            <li class="ml-9 h-full">
              <a class="flex h-full items-center py-2.5" href="">Location</a>
            </li>
            <li class="ml-9 h-full">
              <a class="flex h-full items-center py-2.5" href=""
                >Life at Kigali centers</a
              >
            </li>
            <li class="ml-9 h-full">
              <a class="flex h-full items-center py-2.5" href="">How We Hire</a>
            </li>
            <li class="ml-9 h-full">
              <a class="flex h-full items-center py-2.5" href="">Students</a>
            </li>
            <li class="ml-9 h-full">
              <router-link to="/jobs" class="flex h-full items-center py-2.5"
                >Jobs</router-link
              >
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="isLoggedIn" />
          <global-button v-else text="Sign In" @click="loginUser()" />
        </div>
      </div>
      <the-subnav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script>
import GlobalButton from "@/components/shared/GlobalButton.vue";
import ProfileImage from "@/components/navigation/ProfileImage.vue";
import TheSubnav from "@/components/navigation/TheSubnav.vue";

import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/stores/user.js";

export default {
  name: "MainNav",
  components: { GlobalButton, ProfileImage, TheSubnav },
  data() {
    return {
      company: "Careers",
    };
  },

  computed: {
    ...mapState(useUserStore, ["isLoggedIn"]), //mapStores returns an object of all the stores properties in the userStore object(naming: [id]Store)
    //by the above syntax we will have access to the obect userStore with all the data from the store named "user"
  },
  methods: {
    ...mapActions(useUserStore, ["loginUser"]),
  },
};
</script>
