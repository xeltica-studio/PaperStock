<template>
	<v-app dark>
		<v-app-bar :clipped-left="true" color="primary" dark fixed app>
			<v-toolbar-title>
				PaperStock
			</v-toolbar-title>
			<v-spacer />
		</v-app-bar>
		<v-content>
			<v-container>
				<nuxt />
			</v-container>
		</v-content>
	</v-app>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class WithoutDrawer extends Vue {
}
</script>
