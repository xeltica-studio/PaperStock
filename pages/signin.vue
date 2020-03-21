<template>
	<v-container fluid>
		<v-row align="center" justify="center">
			<v-col>
				<v-card
					class="mx-auto pa-2"
					max-width="512"
					elevation="16"
				>
					<v-card-title>
						{{ isSignUp ? "新規作成" : "サインイン" }}
					</v-card-title>
					<v-card-text>
						<v-text-field v-model="username" clearable label="ユーザー名" />
						<v-text-field v-model="password" clearable type="password" label="パスワード" />
						<template v-if="isSignUp">
							<v-text-field v-model="passwordConfirm" clearable type="password" label="パスワード(確認)" />
							<v-checkbox v-model="confirmToS" label="利用規約に同意する" />
						</template>
					</v-card-text>
					<v-divider />
					<v-card-actions>
						<v-row class="mr-2" align="center" justify="end">
							<v-btn text @click="isSignUp = !isSignUp">
								{{ isSignUp ? "既存アカウントでログイン" : "アカウントを新規作成" }}
							</v-btn>

							<v-btn fab small color="primary" :disabled="!canSubmit" @click="submit">
								<v-icon v-if="!isWorking">
									mdi-arrow-right
								</v-icon>
								<v-progress-circular v-else indeterminate color="white" width="2" size="20" />
							</v-btn>
						</v-row>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { AuthStore } from "@/store";

@Component({
	layout: "withoutDrawer"
})
export default class SignIn extends Vue {
	private isSignUp = false;
	private username = "";
	private password = "";
	private passwordConfirm = "";
	private confirmToS = false;
	private isWorking = false;

	public get canSubmit () {
		return this.isSignUp
			? this.username && this.password && this.password === this.passwordConfirm && this.confirmToS
			: this.username && this.password;
	}

	public async submit () {
		try {
			if (this.isSignUp) {
				await AuthStore.signUpAsync({
					username: this.username,
					password: this.password
				});
			} else {
				await AuthStore.signInAsync({
					username: this.username,
					password: this.password
				});
			}
			this.$router.replace("/");
		} catch (err) {
			alert(err.message);
		}
	}
}
</script>
