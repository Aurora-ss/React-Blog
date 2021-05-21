// 路由守卫 用中间件写
module.exports= options =>{
    return async function adminauth(ctx,next){
        // console.log(ctx.session.openId)//ctx上下文
        // alert(ctx)//ctx上下文
        // session共享config.default.js里配置
        // if(ctx.session.openId){//已经登录 路由守卫
        //     await next()//走next接口
        // }else{
        //     ctx.body={data:'没有登录'}
        // }
        await next()
    }
}