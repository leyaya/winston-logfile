const path = require('path');
const moment = require('moment');
const wloggers = require('winston').loggers;
//let logDir = "/data/applogs/node-mobile-sku-isomorphism-web";

/**
 * @func
 * @desc 指定logger输出的格式为'时间 - 级别：主要内容 附加内容'
 * @param {object} options - winston log api的参数项
 * @param {func} options.timestamp - log的时间戳
 * @param {string} options.level - log的级别
 * @param {string} options.message - log的主要内容
 * @param {object} options.meta - log的附加内容
 */
function formatter(options) {
    return options.timestamp() + ' - ' + options.level + ': ' + (undefined !== options.message ? options.message : '') + (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
}

function timestamp() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}
/**
 * @func
 * @param  {string} dir - log所在目录
 * @param  {string} filename - log文件名
 * @return {string} 返回完整的log路径
 */
function getLogFileName(dir, filename) {
    let pmId = (process.env.pm_id || 0) % (os.cpus().length || 1),
        index = filename.lastIndexOf('.');

    return path.join(dir, filename.substring(0, index) + '-' + pmId + (filename.substring(index) || '.log'));
}

let config = {console: true, file: "haodou.log"};
config.console = {
    colorize: true,
    timestamp: timestamp
}

config.file = {
   filename: getLogFileName(path.resolve('./'), config.file)
};


config.dailyRotateFile = Object.assign({
    datePattern: DEFAULT_DATE_PATTERN,
    timestamp: timestamp,
    json: false,
    formatter: formatter
}, config.file);

delete config.file;

wloggers.add('haodou', config);