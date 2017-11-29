const path = require('path');
const ejs = require('ejs');
const datacache = require('../tools/datacache.js');
const readfile = require('../tools/readfile.js');
const { brieftemp } = require('../html/brief.js');

module.exports.brief = async function (ctx) {
	const name = ctx.request.query.name;
	const namelist = name.split(';');
	let promiselist = [];
	const start1 = Date.now();
	let Data = datacache.getCache(ctx.url);
	if (!Data) {
		namelist.forEach(filename => {
			promiselist.push(readfile.readFiletoStr(path.join(__dirname, "../log/" + filename)));
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
					if (!hashcity[obj.cityname]) {
						hashcity[obj.cityname] = '';
						++dishItem.citycount;
					}
				} else {
					let keyobj = { keystatus: obj.keystatus, keycount: obj.keystatus, citycount: 1, hashcity: {} };
					keyobj.hashcity[obj.cityname] = '';
					gather[obj.keyword] = keyobj;
				}
			}
		});
		let sortAry = [], keyworkcategory = 0, valid = 0, searchcount = 0;
		for (let key in gather) {
			let keycount = gather[key]['keycount'];
			let citycount = gather[key]['citycount'];
			let keystatus = gather[key]['keystatus'];
			++keyworkcategory;
			valid += keystatus;
			searchcount += keycount;
			sortAry.push({ key: key, keycount: keycount, citycount: citycount, keystatus: keystatus });
		}
		sortAry.sort(function (a, b) {
			return b.keycount - a.keycount
		});
		Data = { sortAry: sortAry, valid: valid, keyworkcategory: keyworkcategory, searchcount: searchcount };
		datacache.setCache(ctx.url, Data, 10 * 60);
	}
	const html = brieftemp({ title: '日志统计结果' });
	Data.dataTime = Date.now() - start1;
	const start2 = Date.now();
	ctx.body = ejs.render(html, Data);
	console.log(`~~~数据渲染耗时： ` + (Date.now() - start2));
}







