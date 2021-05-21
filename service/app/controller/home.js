// 此home文件已经无用 可以删除
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async list(){
    const { ctx } = this;
    ctx.body='<h1>Aurora-ss  blog list</h1>'
  }
}

module.exports = HomeController;
