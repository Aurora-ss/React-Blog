//中台接口
let ipUrl='http://127.0.0.1:7001/default/'
// 服务端地址
let servicePath={
    getArticleList:ipUrl+'getArticleList',//首页接口
    getArticleById:ipUrl+'getArticleById/',//详细页接口
    getTypeInfo:ipUrl+'getTypeInfo',//文章类别接口
    getListById:ipUrl+'getListById/',//根据类别ID获得文章列表接口
    getCommentList:ipUrl+'getCommentList/',
    addComment:ipUrl+'addComment'
}

export default servicePath