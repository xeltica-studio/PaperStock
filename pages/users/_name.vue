<template>
	<v-layout>
		<ps-create-note-button />
		<v-flex>
			<template v-if="error">
				<v-card class="mx-auto" color="error" dark max-width="400">
					<v-card-title>
						<v-icon large left>
							mdi-alert-circle
						</v-icon>
						<span class="title font-weight-light">{{ errorTitle }}</span>
					</v-card-title>
					<v-card-text class="body-1" v-text="errorDescription" />
				</v-card>
			</template>
			<template v-else>
				<h1 class="display-4">
					{{ user.name }}
				</h1>
			</template>
		</v-flex>
	</v-layout>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { API } from "@/utils/api";

@Component
export default class Users extends Vue {
	public async asyncData (ctx: Context) {
		const name = ctx.route.params.name;
		const res = (await API.$get("/v1/user/@" + name)).data;
		if (!res.ok) {
			return {
				error: true,
				errorTitle: "ユーザーが見つかりませんでした",
				errorDescription: `@${name} に該当するユーザーは存在しません。アカウントが既に削除されていないか、タイプミスしていないかをご確認下さい。`
			};
		}
		return { user: res.user };
	}

	public mounted () {

	}
}
</script>
