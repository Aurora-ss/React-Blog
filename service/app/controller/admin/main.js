//后台写接口位置
'use strict'

//引用Controller
const Contoller = require('egg').Controller

class MainContoller extends Contoller {
    async index() {
        this.ctx.body = "hi api"
    }

    // 登录
    async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = "SELECT userName FROM admin_user WHERE userName ='" + userName + "' AND password='" + password + "'"
        const res = await this.app.mysql.query(sql) //从数据库中查询结果返回(数组)
        if (res.length > 0) {
            let openId = new Date().getTime() //登录成功传到前台
            this.ctx.session.openId = {
                'openId': openId
            } //登录状态openId存到session里
            this.ctx.body = {
                'data': "登录成功",
                'openId': openId
            } //登录成功返回到this.ctx.body
        } else {
            this.ctx.body = {
                'data': "登录失败"
            }
        }
    }

    // 获取文章类型
    async getTypeInfo() {
        //获取type表所有数据
        const resType = await this.app.mysql.select('type')
        this.ctx.body = {
            data: resType
        }
    }

    // 添加文章
    async addArticle() {
        let tmpArticle = this.ctx.request.body //取数据
        const result = await this.app.mysql.insert('article', tmpArticle) //插入到article表中
        const insertSuccess = result.affectedRows === 1
        //修改时通过ID修改
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId: insertId
        }
    }

    // 编辑文章
    async updateArticle() {
        let tmpArticle = this.ctx.request.body
        // 去数据库取数据
        const result = await this.app.mysql.update('article', tmpArticle)
        const updateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess: updateSuccess
        }
    }

    // 获取文章列表
    async getArticleList() {
        let sql = 'SELECT article.type_id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            // '%Y-%m-%d %H:%i:%s'
            // "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ,"+
            'article.addTime as addTime,' +
            'article.view_count as view_count,' +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id=type.Id ' +
            'ORDER BY article.id DESC'
        const resList = await this.app.mysql.query(sql) //传sql语句获得值
        this.ctx.body = {
            list: resList
        } //传回给前台调用接口的地方
    }

    // 根据id删除文章
    async deleteArticle() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article', {
            'id': id
        })
        this.ctx.body = {
            data: res
        }
    }

    //根据文章ID得到文章详情，用于修改文章
    async getArticleById() {
        let id = this.ctx.params.id
        let sql = 'SELECT article.type_id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            // "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
            'article.addTime as addTime ,' +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id=' + id
        const result = await this.app.mysql.query(sql) //query插入sql语句
        this.ctx.body = {
            data: result
        } //数据传递给接口
    }

    // 获取评论列表
    async getCommentList() {
        let sql = 'SELECT comment.Id as id,' +
            'comment.commentEmail as commentEmail,' +
            'comment.commentName as commentName,' +
            'comment.commentContent as commentContent,' +
            // '%Y-%m-%d %H:%i:%s'
            "FROM_UNIXTIME(comment.commentTime,'%Y-%m-%d %H:%i:%s') as commentTime "+
            'FROM comment ' +
            'ORDER BY comment.Id DESC'
        const resList = await this.app.mysql.query(sql) //传sql语句获得值
        this.ctx.body = {
            list: resList
        } //传回给前台调用接口的地方
    }

    //根据评论ID得到评论详情，用于修改评论
    async getCommentById() {
        let id = this.ctx.params.id
        let sql = 'SELECT comment.Id as id,' +
            'comment.commentEmail as commentEmail,' +
            'comment.commentName as commentName,' +
            'comment.commentContent as commentContent,' +
            "FROM_UNIXTIME(comment.commentTime,'%Y-%m-%d %H:%i:%s') as commentTime "+
            'FROM comment ' + //comment后面的空格是必须的 
            'WHERE comment.Id=' + id
        const result = await this.app.mysql.query(sql) //query插入sql语句
        this.ctx.body = {
            data: result
        } //数据传递给接口
    }

    // 根据id删除评论
    async deleteComment() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('comment', {
            'Id': id
        })
        this.ctx.body = {
            data: res
        }
    }
}
module.exports = MainContoller