<template>
  <v-layout>
    <v-flex>
      <v-list two-line>
        <v-subheader>ピン留めされたノート</v-subheader>
        <v-alert v-if="pinnedNotes.length === 0" outlined color="error">
          まだねンだわ...。
        </v-alert>
        <v-list-item v-for="note in pinnedNotes" :key="note.id">
          <v-list-item-content>
            <v-list-item-title v-text="note.title" />
            <v-list-item-subtitle v-text="note.group.name" />
          </v-list-item-content>
        </v-list-item>

        <v-subheader>最新のノート</v-subheader>
        <v-alert v-if="pinnedNotes.length === 0" outlined color="error">
          まだねンだわ...。
        </v-alert>
        <v-list-item v-for="note in recentNotes" :key="note.id">
          <v-list-item-content>
            <v-list-item-title v-text="note.title" />
            <v-list-item-subtitle v-text="note.group.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data () {
		return {
			pinnedNotes: [],
			recentNotes: []
		};
	}
});
</script>
