const winston = require('winston')
const path = require('path')
const moment = require('moment')
winston.transports.DailyRotateFile = require('winston-daily-rotate-file')

//模式：日志文件按照天生成，每天一个
let filepath = `../log/haodou-${process.env.pm_id || 0}.log`;
//filepath = `/data/applogs/node-mobile-sku-isomorphism-web/haodou-${process.env.pm_id || 0}.log`

const logger = new (winston.Logger)({
 level: 'info',
 exitOnError: false,
 transports: [
    new (winston.transports.Console)({
        colorize: true,
        timestamp: function () {
           return moment().format('YYYY-MM-DD:HH:mm:ss.SSS')
     },
    json: false,
    // 设置异常信息易读性
    humanReadableUnhandledException: true,
    // 捕获异常
    handleExceptions: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info'
  }),

  new (winston.transports.DailyRotateFile)({
      timestamp: function () {
        return moment().format('YYYY-MM-DD:HH:mm:ss.SSS')
      },
      filename: path.join(__dirname,filepath),
      json: true,
      humanReadableUnhandledException: true,
      handleExceptions: true,
      prepend: true,
      formatter: function(options) {
          return options.level.toUpperCase() +' '+options.timestamp() +' '+ (undefined !== options.message ? options.message : '') +
                 (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    })
  ]
});

setInterval(function() {
  logger.info({message:'我是测试数据',keyword:'麻婆豆腐',keystatus:1,urlstatus:1,cityname: '重庆'});
 // uncomment这里会捕获异常
}, 1000)






