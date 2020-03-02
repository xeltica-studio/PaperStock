<template>
  <v-app dark>
    <v-card class="mx-auto pa-5" max-width="800">
      <v-card-title class="display-2" v-text="errorMessage" />
      <v-card-actions>
        <v-btn exact to="/">
          トップページに戻る
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
export default {
	layout: "empty",
	props: {
		error: {
			type: Object,
			default: null
		}
	},
	data () {
		return {
			pageNotFound: "404 Not Found",
			otherError: "An error occurred"
		};
	},
	computed: {
		errorMessage () {
			return this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
		}
	},
	head () {
		const title = this.errorMessage;
		return {
			title
		};
	}
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
