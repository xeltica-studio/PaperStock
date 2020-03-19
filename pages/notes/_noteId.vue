<template>
	<v-layout>
		<ps-create-note-button />
		<v-flex>
			<p>{{ noteId }}</p>
		</v-flex>
	</v-layout>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class NoteId extends Vue {
	get noteId () {
		return this.$route.params.noteId;
	}
}
</script>
