const Koa = require('koa');
const path = require('path');
const open = require("open");
const fs = require('fs');
const ejs = require('ejs');
const { indextemp } = require('../html/index.js');
const { detailtemp } = require('../html/detail.js');

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
		case '/detail': await detail(ctx); break;
		default: await index(ctx);
	}
}

async function index(ctx) {
	const filepath = path.join(__dirname, "../log");
	const arylist = await readFileNameList(filepath);
	const html = indextemp({ title: "日志列表" });
	const filterAry = arylist.filter(item => {
		if (item.indexOf("haodou") > -1) {
			return item;
		}
	})
	ctx.body = ejs.render(html, { arylist: filterAry });
}

function list(ctx) {
	ctx.body = 'list';
}

async function detail(ctx) {
	const name = ctx.request.query.name;
	const namelist = name.split(';');
	let promiselist = [];
	namelist.forEach(filename => {
		promiselist.push(readFiletoStr(path.join(__dirname, "../log/" + filename)));
	})
	const resultlist = await Promise.all(promiselist);
	let strLog = "";
	resultlist.forEach(str => {
		strLog += str;
	})
	const arylist = strLog.split(/\n/);
	const gather = {};
	arylist.forEach(item => {
		if (item) {
			let obj;
			try {
				obj = JSON.parse(item);
			}
			catch (e) {
				console.log(item);
			}
			let dishItem = gather[obj.keyword];
			obj.keystatus = obj.keystatus || 0;
			obj.urlstatus = obj.urlstatus || 0;

			if (dishItem) {
				let cityItem = dishItem[obj.cityname];
				if (cityItem) {
					cityItem.count = ++cityItem.count;
					cityItem.urlstatus += obj.urlstatus;
				} else {
					let city = {};
					dishItem[obj.cityname] = { count: 1, urlstatus: obj.urlstatus };
				}
				if (dishItem.keycount !== undefined) {
					dishItem.keycount += obj.keystatus;
				} else {
					dishItem.keycount = obj.keystatus;
				}
			} else {
				let cityobj = { keycount: obj.keystatus };
				cityobj[obj.cityname] = { count: 1, urlstatus: obj.urlstatus };
				gather[obj.keyword] = cityobj;
			}
		}
	});
	let sortAry = [];
	for (let key in gather) {
		let count = 0;
		let citylist = [];
		for (let city in gather[key]) {
			if (city != 'keycount') {
				citylist.push({
					cityname: city,
					count: gather[key][city]['count'],
					urlstatus: gather[key][city]['urlstatus']
				});
				count += gather[key][city]['count']
			}
		}
		sortAry.push({ key: key, citylist: citylist, count: count, keycount: gather[key]['keycount'] });
	}
	sortAry.sort(function (a, b) {
		return b.count - a.count
	});
	const html = detailtemp({ title: '日志统计结果' });
	ctx.body = ejs.render(html, { sortAry: sortAry });
}

function readFileNameList(filepath) {
	return new Promise(function (resolve, reject) {
		return fs.readdir(filepath, function (err, entries) {
			if (err) {
				console.log(`读文件列表失败：${err}`);
				reject(err);
			}
			resolve(entries);
		});
	})
}

function readFiletoStr(filepath) {
	return new Promise(function (resolve, reject) {
		return fs.readFile(filepath, 'utf-8', function (err, data) {
			if (err) {
				console.log(`读取文件${filepath}失败：` + err);
				reject(err);
			}
			resolve(data);
		})
	})
}









