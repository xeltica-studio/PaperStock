<template>
	<v-app dark>
		<v-navigation-drawer
			v-model="drawer"
			:mini-variant="miniVariant"
			:mobile-break-point="$vuetify.breakpoint.thresholds.sm"
			clipped
			app
		>
			<v-list>
				<v-list-item class="px-2" to="/userId">
					<v-list-item-avatar color="red">
						<span class="white--text headline">{{ (myself.profileName || myself.name)[0] }}</span>
					</v-list-item-avatar>
					<v-list-item-content v-show="!miniVariant">
						<v-list-item-title class="title">
							{{ myself.profileName || myself.name }}
						</v-list-item-title>
						<v-list-item-subtitle>{{ myself.role || "肩書きなし" }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-divider />
				<v-list-item to="/" router exact>
					<v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>
					<v-list-item-content><v-list-item-title>ダッシュボード<v-list-item-title /></v-list-item-title></v-list-item-content>
				</v-list-item>
				<v-subheader v-show="!miniVariant">
					ノートをさがす
				</v-subheader>
				<v-divider v-show="miniVariant" />
				<v-list-item to="/groups" router exact>
					<v-list-item-action><v-icon>mdi-account-multiple</v-icon></v-list-item-action>
					<v-list-item-content><v-list-item-title>グループ<v-list-item-title /></v-list-item-title></v-list-item-content>
				</v-list-item>
				<v-list-item to="/tags" router exact>
					<v-list-item-action><v-icon>mdi-pound</v-icon></v-list-item-action>
					<v-list-item-content><v-list-item-title>タグ<v-list-item-title /></v-list-item-title></v-list-item-content>
				</v-list-item>
				<v-list-item to="/users" router exact>
					<v-list-item-action><v-icon>mdi-account</v-icon></v-list-item-action>
					<v-list-item-content><v-list-item-title>ユーザー<v-list-item-title /></v-list-item-title></v-list-item-content>
				</v-list-item>
				<v-divider />
				<v-list-item to="/notifications" router exact>
					<v-list-item-action><v-icon>mdi-bell</v-icon></v-list-item-action>
					<v-list-item-content><v-list-item-title>通知<v-list-item-title /></v-list-item-title></v-list-item-content>
				</v-list-item>
				<v-list-item to="/help" router exact>
					<v-list-item-action><v-icon>mdi-help-circle-outline</v-icon></v-list-item-action>
					<v-list-item-content><v-list-item-title>ヘルプ<v-list-item-title /></v-list-item-title></v-list-item-content>
				</v-list-item>
				<v-list-item to="/settings" router exact>
					<v-list-item-action><v-icon>mdi-settings</v-icon></v-list-item-action>
					<v-list-item-content><v-list-item-title>設定<v-list-item-title /></v-list-item-title></v-list-item-content>
				</v-list-item>
				<v-subheader v-show="!miniVariant">
					Powered by PaperStock
				</v-subheader>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar :clipped-left="true" color="primary" dark fixed app>
			<v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click.stop="drawer = !drawer" />
			<v-app-bar-nav-icon v-else @click.stop="useMiniVariant = !useMiniVariant" />
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
import { AuthStore } from "@/store";

@Component
export default class Default extends Vue {
	private drawer: boolean | null = null;
	private useMiniVariant = false

	get myself () { return AuthStore.myself; }

	get miniVariant () { return this.useMiniVariant && this.$vuetify.breakpoint.smAndUp; }
}
</script>
