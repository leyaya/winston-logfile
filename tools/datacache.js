const Data = new Map();

module.exports = {
	getCache: (key) => {
		key = formatKey(key);
		if (!key || !Data.has(key)) return;
		let temp = Data.get(key);
		if (temp.expire == 0 || (temp.expire > 0 && Date.now() < temp.time + temp.expire * 1000)) {
			return temp.val;
		}
		return;
	},
	setCache: (key, val, second) => {
		key = formatKey(key);
		if (!key) return;
		let status = 0;
		if (Data.has(key)) {
			status = 1;
		} else {
			status = 2;
		}
		if (typeof second != 'number' || second < 0) second = 0;
		Data.set(key, { val: val, time: Date.now(), expire: second });
		return status;
	}
}

function formatKey(key) {
	let type = typeof key;
	if (type == 'undefined') {
		throw new Error("查找缓存必须传递key")
	}
	if (['string', 'number'].indexOf(type) >= 0) {
		return (key || '').trim();
	}
	throw new Error("参数类型必须为: string ; number;")
}
