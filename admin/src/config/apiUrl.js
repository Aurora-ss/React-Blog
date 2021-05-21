//配置文件
let ipUrl='http://127.0.0.1:7001/admin/'
let servicePath={
    checkLogin:ipUrl+'checkLogin',//检查用户名密码
    getTypeInfo:ipUrl+'getTypeInfo',//获得文章类别信息
    addArticle:ipUrl+'addArticle',//添加文章
    updateArticle:ipUrl+'updateArticle',//修改文章内容
    getArticleList:ipUrl+'getArticleList',//文章列表
    deleteArticle:ipUrl+'deleteArticle/',//删除文章 通过id
    getArticleById:ipUrl+'getArticleById/',//根据id获得文章详情
    getCommentList:ipUrl+'getCommentList',//获得评论列表内容
    getCommentById:ipUrl+'getCommentById/',//获得评论列表内容
    deleteComment:ipUrl+'deleteComment/',//删除评论 通过id
}

export default servicePath