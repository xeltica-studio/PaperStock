<template>
	<v-layout>
		<ps-create-note-button />
		<v-flex>
			<v-list two-line>
				<h1 class="title">
					ピン留めされたノート
				</h1>
				<v-alert v-if="pinnedNotes.length === 0" outlined color="error">
					ピン留めされたノートはまだありません。
				</v-alert>
				<v-list-item v-for="note in pinnedNotes" :key="note.id">
					<v-list-item-content>
						<v-list-item-title v-text="note.title" />
						<v-list-item-subtitle v-text="note.group.name" />
					</v-list-item-content>
				</v-list-item>

				<h1 class="title">
					最新のノート
				</h1>
				<v-alert v-if="pinnedNotes.length === 0" outlined color="error">
					まだノートがありません。
					<nuxt-link to="/notes/new">
						初めてのノートを書きませんか？
					</nuxt-link>
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
import { Vue, Component } from "nuxt-property-decorator";
import { Note } from "@/models/note";

@Component
export default class Index extends Vue {
	private pinnedNotes: Note[] = [];
	private recentNotes: Note[] = [];
}
</script>
