<template>
	<form @submit.prevent="goToJobs" class="w-full flex items-center h-12 rounded-3xl border border-brand-gray-3">
		<font-awesome-icon :icon="['fas', 'search']" class="ml-5 mr-3" />
		<div class="flex flex-1 flex-nowrap h-full text-base font-light">
			<div class="flex h-full flex-1 relative items-center pr-3">
				<label for="role" class="absolute left-0 -top-10">Role</label>
				<input 
					id="role"
					type="text" 
					v-model="role"
					placeholder="Software engineer" 
					class="w-full text-lg font-normal focus:outline-none"
				/>
			</div>
			<span class="flex items-center f-full border-l border-r border-brand-gray-2 px-3">in</span>
			<div class="flex h-full flex-1 relative items-center pl-3">
				<label for="location" class="absolute left-0 -top-10">Where?</label>
				<input 
					id="location"
					type="text" 
					placeholder="Kigali" 
					v-model="where"
					class="w-full text-lg font-normal focus:outline-none"
				/>
			</div>
				
		</div>
		<global-button text="Search" type="secondary" class="rounded-r-3xl" />
	</form>
</template>
<script>
import GlobalButton from '@/components/shared/GlobalButton.vue';
export default {
	name: "JobSearchForm",
	components: {GlobalButton},
	data() {
		return {
			role: "",
			where: ""
		}
	},
	methods: {
		goToJobs() {
			this.$router.push({ name: "Jobs", query: {role: this.role, where: this.where}})
		}
	}
}
</script>