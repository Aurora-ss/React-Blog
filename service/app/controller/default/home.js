// 接口
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {//测试使用
    // get获取单条数据的方法
    // 读取数据库内容                      表名称    条件
    let result = await this.app.mysql.get("react_blog",{})//blog_content
    // console.log(result)
    this.ctx.body=result
  }

//首页的接口
 async getArticleList() {
    let sql ='SELECT article.id as id ,' + 
    'article.title as title ,'+
    'article.introduce as introduce ,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id=type.Id'
    // 放入sql语句进行高级查询
    const results=await this.app.mysql.query(sql)
    this.ctx.body={data:results}
}
// 根据id获取文章内容
async getArticleById(){
  //先配置路由的动态传值，然后再接收值
    let id=this.ctx.params.id
    let sql ='SELECT article.id as id ,' + 
    'article.title as title ,'+
    'article.introduce as introduce ,'+
    'article.article_content as article_content ,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName ,'+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id=type.Id '+
    'WHERE article.id='+id
    const results1= await this.app.mysql.query(sql)
    this.ctx.body={data:results1}
}

//得到类别名称和编号
async getTypeInfo(){                    // type表的名称
  const result=await this.app.mysql.select('type')
  this.ctx.body={data:result}
}

//根据类别ID获得文章列表
async getListById(){
  let id=this.ctx.params.id
  let sql ='SELECT article.id as id ,' + 
  'article.title as title ,'+
  'article.introduce as introduce ,'+
  //FROM_UNIXTIME() --> sql自带函数
  "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ,"+
  'article.view_count as view_count ,'+
  'type.typeName as typeName '+
  'FROM article LEFT JOIN type ON article.type_id=type.Id '+
  'WHERE type_id='+id
  const result=await this.app.mysql.query(sql)
  this.ctx.body={data:result}
}


async getCommentList(){
  let sql ='SELECT comment.Id as commentId ,' + 
  "FROM_UNIXTIME(comment.commentTime,'%Y-%m-%d %H:%i:%s') as commentTime ,"+
  'comment.commentEmail as commentEmail ,'+
  'comment.commentName as commentName ,'+
  'comment.commentContent as commentContent '+
  'FROM comment ORDER BY comment.Id DESC' 
  // 放入sql语句进行高级查询
  const results=await this.app.mysql.query(sql)
  this.ctx.body={list:results}
}

async addComment(){
  let tmpComment=this.ctx.request.body//取数据
  // console.log(tmpComment)
  const result=await this.app.mysql.insert('comment',tmpComment)
  const insertSuccess=result.affectedRows===1
  const insertId=result.insertId
  this.ctx.body={
      isSuccess:insertSuccess,
      insertId:insertId,
  }
}

async getCommentInfo(){
  //获取type表所有数据
  const resType=await this.app.mysql.select('comment')
  this.ctx.body={data:resType}
}
}

module.exports = HomeController;
