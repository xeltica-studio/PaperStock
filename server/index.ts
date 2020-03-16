import Koa from "koa";
import Router from "koa-router";
import consola from "consola";
import chokidar from "chokidar";
import esm from "esm";
import { buildErrorResponse } from "./utils/build-response";
import config from "@/nuxt.config";
import apiV1 from "@/server/api/v1";

// Import and Set Nuxt.js options

const app = new Koa();
const router = new Router();
config.dev = app.env !== "production";

// Error Handling
app.use(async (ctx, next) => {
	try {
		await next();
		if (ctx.status === 404) {
			const err = { status: 404, message: "Not Found" };
			throw err;
		}
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = buildErrorResponse(err.message, err.status);
	}
});

// Dispatch api requests
router.use("/v1", apiV1);

// Register Router
app.use(router.routes());
app.use(router.allowedMethods({ throw: true }));

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
