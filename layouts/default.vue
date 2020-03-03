<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      mobile-break-point="sm"
      clipped
      app
    >
      <v-list>
        <v-list-item to="/" router exact>
          <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>
          <v-list-item-content><v-list-item-title>ダッシュボード<v-list-item-title /></v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-subheader>ノートをさがす</v-subheader>
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
        <v-subheader>
          Powered by PaperStock
        </v-subheader>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" color="primary" dark fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <v-icon>mdi-file-document-box-multiple</v-icon>
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
import Vue from "vue";

export default Vue.extend({
	data () {
		return {
			drawer: null as boolean | null
		};
	}
});
</script>
