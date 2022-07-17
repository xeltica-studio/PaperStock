// server.js
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

import prisma from './libs/prisma';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
	await initiaizeAsync();
	createServer(async (req, res) => {
		try {
			// Be sure to pass `true` as the second argument to `url.parse`.
			// This tells it to parse the query portion of the URL.
			if (!req.url) return;
			const parsedUrl = parse(req.url, true);
			await handle(req, res, parsedUrl);
		} catch (err) {
			console.error('Error occurred handling', req.url, err);
			res.statusCode = 500;
			res.end('internal server error');
		}
	}).listen(port, () => {
		// TODO: バックグラウンド処理はここ
	});
});

async function initiaizeAsync() {
	await prisma.serverSetting.findUniqueOrThrow().catch(async () => {
		// サーバー設定を挿入する
		await prisma.serverSetting.create({data: {}});
	});
}
