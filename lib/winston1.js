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

logger.log('info',{message:'我是测试数据',keword:'石锅鱼'});




fs.readFile(filepath,{flag:'r+',encoding:'utf-8'},function(err,data){
    if(err){
        console.log("bad")
    }else{
        console.log("读取第一个文件成功");
        console.log(data);
        // fs.readFile('../file2.txt','utf-8',function(err,data){
        //     if(err){
        //        console.log("读取第二个文件失败");
        //     }
        //     if(data){
        //         console.log("读取第2个文件成功");
        //         console.log(data);
        //     }
        // })
        }
})



// let bf = Buffer.from("写入文件数据的内");
// console.log(bf.length);






