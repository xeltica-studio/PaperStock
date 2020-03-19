<template>
	<x-note-editor @submit="onSubmit" @close="onClose" />
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import XNoteEditor from "@/components/note-editor.vue";

@Component({
	layout: "empty",
	head: {
		title: "新規ノート作成"
	},
	components: {
		XNoteEditor
	}
})
export default class NotesNew extends Vue {
	onSubmit () {
		// todo 投稿を実装する
		// todo 投稿を実装したら、その投稿に遷移するようにする
		this.$router.push("/");
	}

	onClose () {
		this.$router.back();
	}
}
</script>
