const winston = require('winston');
const moment = require('moment');
const path = require('path');
const fs= require("fs");


const filepath = `../log/haodou-${moment().format('YYYY-MM-DD')}-${process.env.pm_id || 0}.log`;

function timestamp() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({level: 'info', timestamp: timestamp }),
    new (winston.transports.File)({ 
      filename: path.resolve(filepath),
      formatter: function(options) {
        return options.level.toUpperCase() +' '+options.timestamp() +' '+ (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
        }
      })
  ]
});

//logger.info('info', '1231231Hello distributed log files!');

logger.log('info',{message:'我是测试数据',keword:'烤鸭',cityname: '南京'});



