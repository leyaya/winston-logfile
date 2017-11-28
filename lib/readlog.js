const Koa = require('koa');
const path = require('path');
const open = require("open");
const fs = require('fs');
const ejs = require('ejs');
const { indextemp } = require('../html/index.js');
const { detailtemp } = require('../html/detail.js');
const { brieftemp } = require('../html/brief.js');
const datacache = require('../tools/datacache.js');

const app = new Koa();
let DataCache = {};

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
		case '/brief': await brief(ctx); break;
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

async function brief(ctx){
	const name = ctx.request.query.name;
	const namelist = name.split(';');
	let promiselist = [];
	const start1 = Date.now();
	let Data = datacache.getCache(ctx.url);
	if (!Data) {
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
				if (dishItem) {
					++dishItem.keycount;
					let hashcity = dishItem.hashcity;
					if (!hashcity[obj.cityname]){
						hashcity[obj.cityname] = '';
						++dishItem.citycount;
					}
				} else {
					let keyobj = {keystatus : obj.keystatus ,keycount: obj.keystatus,citycount : 1,hashcity:{}};
					keyobj.hashcity[obj.cityname] = '';
					gather[obj.keyword] = keyobj;
				}
			}
		});
		let sortAry = [],keyworkcategory = 0 ,valid = 0,searchcount = 0 ;
		for (let key in gather) {
			let keycount = gather[key]['keycount'];
			let citycount = gather[key]['citycount'];
			let keystatus = gather[key]['keystatus'];
			++keyworkcategory;
			valid += keystatus; 
			searchcount += keycount;
			sortAry.push({ key: key, keycount: keycount, citycount: citycount, keystatus :keystatus });
		}
		sortAry.sort(function (a, b) {
			return b.keycount - a.keycount
		});
		Data = { sortAry: sortAry, valid: valid, keyworkcategory : keyworkcategory , searchcount : searchcount};
		datacache.setCache(ctx.url, Data, 10*60);
	}
	const html = brieftemp({ title: '日志统计结果' });
	Data.dataTime = Date.now() - start1;
	const start2 = Date.now();
	ctx.body = ejs.render(html, Data);
	console.log(`~~~数据渲染耗时： ` + (Date.now() - start2));
}

async function detail(ctx) {
	const name = ctx.request.query.name;
	const namelist = name.split(';');
	let promiselist = [];
	const start1 = Date.now();
	let Data = datacache.getCache(ctx.url);
	if (!Data) {
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
				obj.shopcount = obj.shopcount || 0;

				if (dishItem) {
					let cityItem = dishItem[obj.cityname];
					if (cityItem) {
						cityItem.count = ++cityItem.count;
						cityItem.urlstatus += obj.urlstatus;
						cityItem.shopcount = obj.shopcount;
					} else {
						let city = {};
						dishItem[obj.cityname] = { count: 1, urlstatus: obj.urlstatus, shopcount: obj.shopcount };
					}
					if (dishItem.keycount !== undefined) {
						dishItem.keycount += obj.keystatus;
					} else {
						dishItem.keycount = obj.keystatus;
					}
				} else {
					let cityobj = { keycount: obj.keystatus };
					cityobj[obj.cityname] = { count: 1, urlstatus: obj.urlstatus, shopcount: obj.shopcount };
					gather[obj.keyword] = cityobj;
				}
			}
		});
		let sortAry = [], keyworkcategory = 0, searchcount = 0, keysuscount = 0;
		for (let key in gather) {
			let count = 0;
			let citylist = [];
			for (let city in gather[key]) {
				if (city != 'keycount') {
					let citycount = gather[key][city]['count'];
					citylist.push({
						cityname: city,
						count: citycount,
						urlstatus: gather[key][city]['urlstatus'],
						shopcount: gather[key][city]['shopcount'],
					});
					count += citycount;
				}
			}
			searchcount += count;
			++keyworkcategory;
			let keycount = gather[key]['keycount'];
			if (keycount)++keysuscount;
			sortAry.push({ key: key, citylist: citylist, count: count, keycount: keycount });
		}
		sortAry.sort(function (a, b) {
			return b.count - a.count
		});
		Data = { sortAry: sortAry, keyworkcategory: keyworkcategory, searchcount: searchcount, keysuscount: keysuscount};
		datacache.setCache(ctx.url, Data, 10*60);
	}
	const html = detailtemp({ title: '日志统计结果' });
	Data.dataTime = Date.now() - start1;
	const start2 = Date.now();
	ctx.body = ejs.render(html, Data);
	console.log(`~~~数据渲染耗时： ` + (Date.now() - start2));
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









