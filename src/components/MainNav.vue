<!-- eslint-disable prettier/prettier -->
<template>
  <header :class="['w-full', 'text-sm', 'h-16', { 'h-32': isLoggedIn }]">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <a href="/" class="flex h-full items-center text-xl">Kigali Careers</a>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li class="h-full">
              <a class="flex h-full items-center py-2.5" href="">Teams</a>
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
              <a class="flex h-full items-center py-2.5" href="">Jobs</a>
            </li>
          </ul>
        </nav>
		<div class="ml-auto items-center flex h-full">
			
			<profile-image v-if="isLoggedIn" />
			<global-button v-else @click="isLoggedIn = true"  text="Sign In" />
		</div>
      </div>
	  <the-subnav v-if="isLoggedIn"  />
    </div>
  </header>
</template>

<script>
import GlobalButton from "./GlobalButton.vue";
import ProfileImage from "./ProfileImage.vue";
import TheSubnav from "./TheSubnav.vue";

export default {
  name: "MainNav",
  data() {
    return {
      company: "Careers",
	  isLoggedIn: false,
    };
  },
  components: { GlobalButton, ProfileImage, TheSubnav }
};
</script>
