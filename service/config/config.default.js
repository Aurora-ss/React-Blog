/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587601261968_3650';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

// 连接数据库
  config.mysql = {
    // database configuration
    client: {
      // host 可以改为服务器地址
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'root',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security={
    csrf:{enable:false},//egg提供的安全机制
    domainWhiteList:['*']//白名单
  };
  config.cors={
    // origin:'*',//允许哪些域名可以跨域访问 *所有
    origin:'http://localhost:3001',
    credentials:true,//允许Cookie可以跨域
    allowMethods:'GET,POST,PUT,UPDATE,HEAD,DELDTE,PATCH,OPTIONS'
  }
  
  return {
    ...config,
    ...userConfig,
  };
};
