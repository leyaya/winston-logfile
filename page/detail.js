const path = require('path');
const ejs = require('ejs');
const datacache = require('../tools/datacache.js');
const readfile = require('../tools/readfile.js');
const { detailtemp } = require('../html/detail.js');

module.exports.detail = async function (ctx) {
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
				obj.urlstatus = obj.urlstatus || 0;
				obj.shopcount = obj.shopcount || 0;

				if (dishItem) {
					let cityItem = dishItem[obj.cityname];
					if (cityItem) {
						++cityItem.count;
						cityItem.urlstatus += obj.urlstatus;
						cityItem.shopcount = obj.shopcount;
					} else {
						let city = {};
						dishItem[obj.cityname] = { count: 1, urlstatus: obj.urlstatus, shopcount: obj.shopcount };
					}
				} else {
					let cityobj = { keystatus: obj.keystatus };
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
				if (city != 'keystatus') {
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
			let keystatus = gather[key]['keystatus'];
			keysuscount += keystatus;
			sortAry.push({ key: key, citylist: citylist, count: count, keystatus: keystatus });
		}
		sortAry.sort(function (a, b) {
			return b.count - a.count
		});
		Data = { sortAry: sortAry, keyworkcategory: keyworkcategory, searchcount: searchcount, keysuscount: keysuscount };
		datacache.setCache(ctx.url, Data, 10 * 60);
	}
	const html = detailtemp({ title: '日志统计结果' });
	Data.dataTime = Date.now() - start1;
	const start2 = Date.now();
	ctx.body = ejs.render(html, Data);
	console.log(`~~~数据渲染耗时： ` + (Date.now() - start2));
}







