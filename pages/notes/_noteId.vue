<template>
  <v-layout>
    <ps-create-note-button />
    <v-flex>
      <p>{{ noteId }}</p>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	computed: {
		noteId () {
			return this.$route.params.noteId;
		}
	}
});
</script>
