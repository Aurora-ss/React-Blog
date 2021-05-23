//后台配置文件
module.exports = app=>{
    const {router,controller} = app
    // adminauth()框架自带此方法
    var adminauth=app.middleware.adminauth()//路由守卫 中间件形式写的
    router.get('/admin/index',controller.admin.main.index)
    router.post('/admin/checkLogin',controller.admin.main.checkLogin)
    router.get('/admin/getTypeInfo',adminauth,controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle',adminauth,controller.admin.main.addArticle)
    router.post('/admin/updateArticle',adminauth,controller.admin.main.updateArticle)
    router.get('/admin/getArticleList',adminauth,controller.admin.main.getArticleList)
    router.get('/admin/deleteArticle/:id',adminauth,controller.admin.main.deleteArticle)
    router.get('/admin/getArticleById/:id',adminauth,controller.admin.main.getArticleById)
    router.get('/admin/getCommentList',adminauth,controller.admin.main.getCommentList) // 获取评论列表
    router.get('/admin/getCommentById/:id',adminauth,controller.admin.main.getCommentById) // 根据评论id获取评论信息
    router.get('/admin/deleteComment/:id',adminauth,controller.admin.main.deleteComment) // 根据评论id删除评论信息
    // router.get('/admin/editComment/:id',adminauth,controller.admin.main.editComment) 
    router.post('/admin/updateComment',adminauth,controller.admin.main.updateComment)
}