import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { User } from "@/models/user";
import { API } from "@/utils/api";

@Module({
	name: "Auth",
	namespaced: true,
	stateFactory: true
})
export default class Auth extends VuexModule {
	private _myself: User | null = null;

	public get myself () { return this._myself; }

	@Mutation
	public setMyself (user: User) { this._myself = user; }

	@Action
	public async signInAsync ({ username, password }: { username: string, password: string }) {
		const res = (await API.$post("/v1/signin", {
			params: { username, password }
		})).data;

		if (res.ok) {
			this.setMyself(res.user);
		}
	}

	@Action
	public async signUpAsync ({ username, password }: { username: string, password: string }) {
		const res = (await API.$post("/v1/signup", {
			params: { username, password }
		})).data;

		if (res.ok) {
			this.setMyself(res.user);
		}
	}
}
