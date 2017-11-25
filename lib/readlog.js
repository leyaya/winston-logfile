const Koa = require('koa');
const path = require('path');
const open = require("open");
const fs = require('fs');
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
//open('http://' + host + ':' + port + '/index');
open('http://' + host + ':' + port + '/detail?name=haodou-2017-11-24-0.log');

async function router(ctx) {
	switch (ctx.url.split("?")[0].trim()) {
		case '/list' : await list(ctx); break;
		case '/detail' : await detail(ctx); break;
		default : await index(ctx);
	}
}

async function index(ctx) {
	const arylist = await readFileNameList(path.resolve('../log'));//log
	ctx.body = JSON.stringify(arylist);
}

function list(ctx) {
	ctx.body = 'list';
}

async function detail(ctx) {
   const name = ctx.request.query.name;
   const strLog = await readFiletoStr(path.resolve('../log/' + name));//log
   const arylist = strLog.split(/\n/);
   const map = new Map();
   arylist.forEach(item =>{
   		let obj = JSON.parse(item);
   		let itemMap = map.get(obj.keword);
   		if(itemMap){
   			let cityVal = itemMap.city.get(obj.cityname);
			if(city){
				itemMap.city.set(obj.cityname,++cityVal);
			}else{
				itemMap.city = new Map([obj.cityname,1]);
			}
   			map.set(obj.keword,itemMap);
   		}else{
   			map.set(obj.keword,{city:new Map([obj.cityname,1])});
   			//map.set(obj.keword,new Map([obj.cityname,1]));
   		}
   });
   map.forEach(function(value, key, map) {
	  console.log("Key: %s, Value: %s", key, value);
	});
   ctx.body = arylist;
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
		return  fs.readFile(filepath,'utf-8',function(err,data){
            if(err){
               console.log(`读取文件${filepath}失败：` + err);
               reject(err);
            }
            resolve(data);
        })
	})
}









