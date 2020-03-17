import Router from "koa-router";
import $ from "cafy";
import { userNamePattern } from "@/misc/patterns";
import { buildErrorResponse, buildResponse } from "@/server/misc/build-response";
import { ApiError, ErrorId } from "@/server/misc/api-error";
const router = new Router();

router.get("/ping", (ctx, _) => {
	ctx.body = buildResponse({ pong: "pong" });
});

router.get("/teapot", (ctx, _) => {
	ctx.status = 418;
	ctx.body = buildErrorResponse("I'm a teapot.", 418);
});

router.post("/signin", (ctx, _) => {
	const name = ctx.query.userName as string;
	const password = ctx.query.password as string;

	if ($.str.match(userNamePattern).nok(name)) {
		throw new ApiError("Invalid username", ErrorId.invalidParam);
	}
	if ($.str.nok(password)) {
		throw new ApiError("Invalid password", ErrorId.invalidParam);
	}
});

export default router.routes();
