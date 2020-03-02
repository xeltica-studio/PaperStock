import Koa from "koa";
import Router from "koa-router";
import consola from "consola";
import { Nuxt, Builder } from "nuxt";
import chokidar from "chokidar";
import esm from "esm";
import config from "../nuxt.config";
import apiV1 from "@/server/api/v1";

// Import and Set Nuxt.js options

const app = new Koa();
const router = new Router();
config.dev = app.env !== "production";

function initializeBackend () {
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

	// app.on('error', (err, ctx) => {
	//   /* centralized error handling:
	//   *   console.log error
	//   *   write error to log file
	//   *   save error and request information to database if ctx.request match condition
	//   *   ...
	//   */
	// })
}

async function start () {
	// Instantiate nuxt.js
	const nuxt = new Nuxt(config);

	const {
		host = process.env.HOST || "127.0.0.1",
		port = process.env.PORT || 3000
	} = nuxt.options.server;

	await nuxt.ready();
	// Build in development
	if (config.dev) {
		const builder = new Builder(nuxt);
		await builder.build();

		chokidar.watch("./server/").on("all", function () {
			const e = esm(module);
			Object.keys(e.cache).forEach((id) => {
				if (/[/\\]server[/\\]/.test(id)) {
					delete e.cache[id];
				}
			});
		});
	}

	app.use((ctx) => {
		ctx.status = 200;
		ctx.respond = false; // Bypass Koa's built-in response handling
		(ctx.req as any).ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
		nuxt.render(ctx.req, ctx.res);
	});

	app.listen(port, host);
	consola.ready({
		message: `Server listening on http://${host}:${port}`,
		badge: true
	});
}

start();
initializeBackend();
