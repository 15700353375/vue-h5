
var webpack = require('webpack');
var webpackDevServer = require("webpack-dev-server");
var webpackConfig = require('./webpack.dev.conf');
//路径为文件夹，自动引入index文件
var config = require('../config');

var opn = require('opn');

var compiler = webpack(webpackConfig);



// var uri = 'http://localhost:' + port;
var uri = 'http://localhost:' + config.dev.port;

var server = new webpackDevServer(compiler,{
  hot: true,
  inline: true,
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
  host:"http://api.douban.com/v2",
  proxy: {
    '/api': {
      // target: 'http://192.168.0.16:80',
      // target: "http://192.168.0.98:8003",
      target: 'http://api.douban.com/v2',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
});

server.listen(8003,'0.0.0.0',function(error){
  if(error){
    throw error;
  }
  //服务启动后，打开网页
  opn(uri);
});
