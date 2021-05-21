//前台路由配置文件
module.exports = app=>{
    // 从app解构 router,controller两个对象
    const {router,controller} = app
    // 127.0.0.1:7001/default/index
    //         自定义路径        访问模块
    router.get('/default/index',controller.default.home.index)
    router.get('/default/getArticleList',controller.default.home.getArticleList)
    router.get('/default/getArticleById/:id',controller.default.home.getArticleById)
    router.get('/default/getTypeInfo',controller.default.home.getTypeInfo)
    router.get('/default/getListById/:id',controller.default.home.getListById)
    router.get('/default/getCommentList',controller.default.home.getCommentList)
    router.post('/default/addComment',controller.default.home.addComment)
    router.get('/default/getCommentInfo',controller.default.home.getCommentInfo)
}