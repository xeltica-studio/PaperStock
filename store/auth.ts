import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { User } from "@/models/entities/user";
import { API } from "@/utils/api";

@Module({
	name: "Auth",
	namespaced: true,
	stateFactory: true
})
export default class Auth extends VuexModule {
	private _myself: User | null = null;
	private _token: string | null = null;

	public get myself () { return this._myself; }
	public get token () { return this._token; }

	@Mutation
	public signOut () {
		this._token = null;
		this._myself = null;
	}

	@Mutation
	private setResponse (res: any) {
		this._myself = res.user;
		this._token = res.token;
	}

	@Action({ rawError: true })
	public async signInAsync ({ username, password }: { username: string, password: string }) {
		const res = (await API.$post("/v1/signin", null, {
			params: { username, password }
		})).data;

		if (res.ok) {
			this.setResponse(res);
		}
	}

	@Action({ rawError: true })
	public async signUpAsync ({ username, password }: { username: string, password: string }) {
		const res = (await API.$post("/v1/signup", null, {
			params: { username, password }
		})).data;

		if (res.ok) {
			this.setResponse(res);
		}
	}
}
