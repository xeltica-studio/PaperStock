import Router from "koa-router";
const router = new Router();

router.get("/ping", (ctx, _) => {
	ctx.body = "pong";
});

router.get("/teapot", (ctx, _) => {
	ctx.status = 418;
	ctx.body = "I'm a teapot!!!!";
});

router.use((ctx, _) => {
	ctx.status = 404;
	ctx.body = "Not Found";
});

export default router.routes();
