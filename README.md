# winston-logfile
winston日志文件读写统计

log日志读写，html页面查阅log统计数据

使用步骤：
1. 运行 node winston1.js 可以写入测试log日志，日志文件按天写入
2. 运行 node readlog.js 可以启动服务来访问日志统计页面，如：http://127.0.0.1:3000/index
3. 如果想自动监控js代码更新来重启node服务请使用命令 nodemon readlog.js 代替 node readlog.js命令，当然你的电脑必须安装 nodemon

本日志案例基于winston，也是目前公司所使用的一种log方案，因为产品希望看到每天数据请求的关键字统计结果，所以写了这么个页面，当然这个并不适合大数据量的统计，还是落到DB库的数据比较好，如果只是满足简单临时的需求可以一用，落地的log方案只适合记录一些node机器异常的小量数据。
