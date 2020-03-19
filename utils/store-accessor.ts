/* eslint-disable import/no-mutable-exports */
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import Auth from "@/store/Auth";

let AuthStore: Auth;

function initializeStores (store: Store<any>): void {
	AuthStore = getModule(Auth, store);
}

export { initializeStores, AuthStore };
