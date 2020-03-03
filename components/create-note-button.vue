<template>
  <v-btn
    fab
    bottom
    right
    fixed
    dark
    color="secondary"
    @click="createNote"
  >
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	methods: {
		createNote () {
			this.$router.push("/notes/new");
		}
	}
});
</script>
