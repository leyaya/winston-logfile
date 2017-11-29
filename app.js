const Koa = require('koa');
const path = require('path');
const open = require("open");
const { brieftemp } = require('./html/brief.js');
const detailpage = require('./page/detail.js').detail;
const indexpage = require('./page/index.js').index;
const briefpage = require('./page/brief.js').brief;
const emptypage = require('./page/empty.js').empty;
const datacache = require('./tools/datacache.js');

const app = new Koa();

const port = 3000;
const host = '127.0.0.1';

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	await router(ctx);
	const ms = Date.now() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.listen(3000);
console.log('已经成功启动监听3000端口');
open('http://' + host + ':' + port + '/index');
//open('http://' + host + ':' + port + '/detail?name=haodou-2017-11-24-0.log');

async function router(ctx) {
	switch (ctx.url.split("?")[0].trim()) {
		case '/list': await list(ctx); break;
		case '/brief': await briefpage(ctx); break;
		case '/detail': await detailpage(ctx); break;
		case '/empty': await emptypage(ctx); break;
		default: await indexpage(ctx);
	}
}

function list(ctx) {
	ctx.body = 'list';
}









