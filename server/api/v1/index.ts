import Router from "koa-router";
import $ from "cafy";
import { userNamePattern } from "@/misc/patterns";
import { buildErrorResponse, buildResponse } from "~/server/utils/build-response";
const router = new Router();

router.get("/ping", (ctx, _) => {
	ctx.body = buildResponse({ pong: "pong" });
});

router.get("/teapot", (ctx, _) => {
	ctx.status = 418;
	ctx.body = buildErrorResponse("I'm a teapot.", 418);
});

router.get("/undefined-error", (ctx, _)	 => {
	const a = undefined as any;
	ctx.body = a.undefinedProperty;
});

router.post("/signin", (ctx, _) => {
	const name = $.str.match(userNamePattern).throw(ctx.query.userName);
	const password = $.str.throw(ctx.query.password);

	ctx.body = buildResponse({ name, password });
});

export default router.routes();
