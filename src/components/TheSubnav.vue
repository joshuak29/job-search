<template>
<div class="border-b h-16 w-full border-brand-gray-1 border-solid">
<div class="flex h-full items-center px-8 bg-white">
<div v-if="onJobTab">
<font-awesome-icon :icon="['fas', 'search']" class="mr-3"/>
<span><span class="text-brand-green-1">2033</span> jobs matched</span>
</div>
</div>
</div>
</template>
<script>
export default {
	name: "TheSubnav",
	data() {
		return{
			onJobTab: true
		}
	}
}
</script>