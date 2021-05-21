// 入口路由
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const { router, controller } = app;
  // router.get('/', controller.home.index);
  // router.get('/list', controller.home.list);
  //引入 传入app
  require('./router/default')(app)
  require('./router/admin')(app)
}
