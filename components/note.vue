<template>
	<div class="root">
		<h1>{{ title }}</h1>
		<!-- eslint-disable-next-line vue/no-v-html -->
		<div v-html="markdown" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import md from "@/utils/markdown";

export default Vue.extend({
	props: {
		title: {
			type: String,
			required: true
		},
		body: {
			type: String,
			required: true
		}
	},
	data () {
		return {
			markdown: ""
		};
	},
	watch: {
		body () {
			this.markdown = md.render(this.body);
		}
	}
});
</script>
