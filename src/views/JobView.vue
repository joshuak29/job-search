<template>
	<div>
	Job Listing
	</div>
</template>
<script>
export default {
	name: 'JobView',
	mounted() {
		console.log(this.$route.params.id)
	}
}
</script>