import Koa from "koa";
import Router from "koa-router";
import consola from "consola";
import chokidar from "chokidar";
import esm from "esm";
import config from "@/../nuxt.config";
import apiV1 from "@/api/v1";

// Import and Set Nuxt.js options

const app = new Koa();
const router = new Router();
config.dev = app.env !== "production";

// Dispatch api requests
router.use("/api/v1", apiV1);
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = err.message;
		ctx.app.emit("error", err, ctx);
	}
});

const host = process.env.HOST || "127.0.0.1";
const port = parseInt(process.env.PORT || "8081");

// Build in development
if (config.dev) {
	chokidar.watch("./server/").on("all", function () {
		const e = esm(module);
		Object.keys(e.cache).forEach((id) => {
			if (/[/\\]server[/\\]/.test(id)) {
				delete e.cache[id];
			}
		});
	});
}

app.listen(port, host);
consola.ready({
	message: `Server listening on http://${host}:${port}`,
	badge: true
});
