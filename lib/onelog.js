const winston = require('winston');
const moment = require('moment');
const path = require('path');
const fs= require("fs");

//模式：单个日志文件统计

let filepath = `../log/haodou-${moment().format('YYYY-MM-DD')}-${process.env.pm_id || 0}.log`;
//filepath = `../log/haodou-2017-11-18-${process.env.pm_id || 0}.log`;

function timestamp() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({level: 'info', timestamp: timestamp }),
    new (winston.transports.File)({ 
      filename: path.join(__dirname,filepath),
      formatter: function(options) {
        return options.level.toUpperCase() +' '+options.timestamp() +' '+ (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
        }
      })
  ]
});

//logger.log('info',{message:'我是测试数据',keyword:'麻婆豆腐',keystatus:1,urlstatus:1,cityname: '重庆'});
setInterval(function() {
  logger.info({message:'我是测试数据',keyword:'麻婆豆腐',keystatus:1,urlstatus:1,cityname: '重庆'});
 // uncomment这里会捕获异常
}, 1000)

