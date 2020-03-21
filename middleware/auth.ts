import { Context } from "@nuxt/types";
import { AuthStore } from "@/store";

export default (ctx: Context) => {
	if (!AuthStore.token && ctx.route.path !== "/signin") {
		ctx.redirect("/signin");
	}
};
