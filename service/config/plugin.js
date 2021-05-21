'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

//开启新安装模块

//配置组件
exports.mysql = {
  enable:true,//是否使用
  package:'egg-mysql'
}


exports.cors={
  enable:true,
  package:'egg-cors'
}