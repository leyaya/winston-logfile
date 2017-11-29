const fs = require('fs');

module.exports = {
	readFileNameList: (filepath) => {
		return new Promise(function (resolve, reject) {
			return fs.readdir(filepath, function (err, entries) {
				if (err) {
					console.log(`读文件列表失败：${err}`);
					reject(err);
				}
				resolve(entries);
			});
		})
	},
	readFiletoStr: (filepath) => {
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
}
