<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      :mobile-break-point="768"
      app
    >
      <v-list>
        <v-list-item to="/" router exact>
          <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>
          <v-list-item-content><v-list-item-title>ダッシュボード<v-list-item-title /></v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-divider />
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
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
	data () {
		return {
			clipped: true,
			drawer: false,
			fixed: true,
			items: [
				{
					icon: "mdi-home",
					title: "ダッシュボード",
					to: "/"
				},
				{
					icon: "mdi-account-multiple",
					title: "グループ",
					to: "/groups"
				},
				{
					icon: "mdi-pound",
					title: "タグ",
					to: "/tags"
				},
				{
					icon: "mdi-account",
					title: "ユーザー",
					to: "/users"
				},
				{
					icon: "mdi-bell",
					title: "通知",
					to: "/notifications"
				},
				{
					icon: "mdi-help-circle-outline",
					title: "ヘルプ",
					to: "/help"
				},
				{
					icon: "mdi-settings",
					title: "環境設定",
					to: "/settings"
				}

			],
			miniVariant: true,
			title: "PaperStock"
		};
	},
	mounted () {
		this.$nextTick(() => {
			this.drawer = document.documentElement.clientWidth > 768;
		});
	}
};
</script>
