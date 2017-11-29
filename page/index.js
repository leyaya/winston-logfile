const path = require('path');
const ejs = require('ejs');
const readfile = require('../tools/readfile.js');
const { indextemp } = require('../html/index.js');

module.exports.index = async function (ctx) {
	const filepath = path.join(__dirname, "../log");
	const arylist = await readfile.readFileNameList(filepath);
	const html = indextemp({ title: "日志列表" });
	const filterAry = arylist.filter(item => {
		if (item.indexOf("haodou") > -1) {
			return item;
		}
	})
	ctx.body = ejs.render(html, { arylist: filterAry });
}







