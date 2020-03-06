<template>
	<v-app dark>
		<v-app-bar color="primary" dark fixed app>
			<v-btn icon @click="$emit('close', note, title, markdown)">
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-toolbar-title>
				{{ note ? "ノートの編集" : "新規作成" }}
			</v-toolbar-title>
			<template v-if="$vuetify.breakpoint.xs" #extension>
				<v-tabs v-model="tab" align-with-title>
					<v-tab>エディター</v-tab>
					<v-tab>プレビュー</v-tab>
				</v-tabs>
			</template>
		</v-app-bar>
		<v-content>
			<v-container fluid fill-height>
				<v-row v-if="$vuetify.breakpoint.smAndUp" style="height: 100%">
					<v-col>
						<v-card height="100%">
							<v-container class="editor" style="height: 100%">
								<v-text-field v-model="title" label="タイトル" />
								<textarea v-model="markdown" placeholder="ノート..." />
							</v-container>
						</v-card>
					</v-col>
					<v-col>
						<v-card height="100%">
							<v-container>
								<ps-note :title="title" :body="markdown" />
							</v-container>
						</v-card>
					</v-col>
				</v-row>
				<v-tabs-items v-else v-model="tab">
					<v-tab-item>
						<v-container class="editor" style="height: 100%">
							<v-text-field v-model="title" label="タイトル" />
							<textarea v-model="markdown" placeholder="ノート..." />
						</v-container>
					</v-tab-item>
					<v-tab-item>
						<v-container>
							<ps-note :title="title" :body="markdown" />
						</v-container>
					</v-tab-item>
				</v-tabs-items>
			</v-container>
		</v-content>
		<v-fab-transition>
			<v-btn
				v-show="markdown && title"
				fab
				bottom
				right
				fixed
				dark
				color="secondary"
				@click="$emit('submit', note, title, markdown)"
			>
				<v-icon>mdi-check</v-icon>
			</v-btn>
		</v-fab-transition>
	</v-app>
</template>

<script lang="ts">
import Vue from "vue";
import PsNote from "@/components/note.vue";

export default Vue.extend({
	components: {
		PsNote
	},
	props: {
		note: {
			type: Object,
			required: false,
			default: null
		}
	},
	data () {
		return {
			html: "",
			markdown: "",
			title: "",
			tab: 0
		};
	},
	mounted () {
		if (this.note) {
			this.title = this.note.title;
			this.markdown = this.note.body;
		}
	}
});
</script>

<style lang="scss" scoped>
    .editor {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        textarea {
            width: 100%;
            height: 100%;
            outline: none;
            resize: none;
        }
    }

    .v-window, .v-window__container, .v-window-item {
        width: 100%;
        height: 100%;
    }
</style>
