<template>
	<x-note-editor @submit="onSubmit" @close="onClose" />
</template>

<script lang="ts">
import Vue from "vue";
import XNoteEditor from "@/components/note-editor.vue";

export default Vue.extend({
	layout: "empty",
	components: {
		XNoteEditor
	},
	methods: {
		onSubmit () {
			// todo 投稿を実装する
			// todo 投稿を実装したら、その投稿に遷移するようにする
			this.$router.push("/");
		},
		onClose () {
			this.$router.back();
		}
	},
	head: {
		title: "新規ノート作成"
	}
});
</script>
