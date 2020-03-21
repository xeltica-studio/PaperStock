<template>
	<v-layout>
		<ps-create-note-button />
		<v-flex>
			<v-list>
				<v-list-item>
					<h1 class="title">
						設定
					</h1>
				</v-list-item>
				<v-divider />
				<v-list-item @click="logout">
					<v-list-item-icon><v-icon>mdi-power</v-icon></v-list-item-icon>
					<v-list-item-title>ログアウト</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-flex>
	</v-layout>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { AuthStore } from "@/store";

@Component
export default class Users extends Vue {
	public logout () {
		AuthStore.signOut();
		this.$router.push("/");
	}
}
</script>
