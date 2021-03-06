import React,{useState,useEffect}  from 'react'
import marked from 'marked'
import '../static/css/AddArticle.css'
import {Row,Col,Input,Select,Button,DatePicker, message } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
// import moment from 'moment'
const {Option} = Select //对象解析形式
const {TextArea} = Input

function AddArticle(props){

   const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
   const [articleTitle,setArticleTitle] = useState('')   //文章标题
   const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
   const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
   const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
   const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
   const [showDate,setShowDate] = useState()   //发布日期
   // const [updateDate,setUpdateDate] = useState() //修改日志的日期
   const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
   const [selectedType,setSelectType] = useState('选择文章类型') //选择的文章类别

   useEffect(()=>{//进入函数只执行一次 生命周期函数
    getTypeInfo()//一进入页面就要使用
    //获取文章id
    let tmpId=props.match.params.id
    if(tmpId){//文章id存在
        // 将id进行赋值
        setArticleId(tmpId)
        getArticleById(tmpId)
    }
    // eslint-disable-next-line
   },[props.match.params.id])

   const renderer=new marked.Renderer()
   marked.setOptions({
    renderer:renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  }); 

   const changeContent = (e) =>{//e接收多行文本框的值
    setArticleContent(e.target.value)
    let html=marked(e.target.value)
    setMarkdownContent(html)
   }

   const changeIntroduce = (e)=>{
       setIntroducemd(e.target.value)
       let html=marked(e.target.value)
       setIntroducehtml(html)
   }

   const getTypeInfo = ()=>{
       axios({
           method:'get',
           url:servicePath.getTypeInfo,
           withCredentials:true//可跨域 检验Cookie
       }).then(
           res=>{//路由守卫 守卫成功 返回首页 去adminauth.js里对应
               if(res.data.data==='没有登录'){
                   localStorage.removeItem('openId')
                   props.history.push('/')//跳转页面
               }else{//返回文章信息类型
                   setTypeInfo(res.data.data)
               }
           }
       )
   }

   const selectTypeHandle=(value)=>{
    //value={item.Id} 182行
    setSelectType(value);
   }

   const saveArticle=()=>{
       if(!selectedType){
           message.error('必须选择文章类型')
           return false
       }else if(!articleTitle){
        message.error('文章名称不能为空')
        return false
       }else if(!articleContent){
        message.error('文章内容不能为空')
        return false
       }else if(!introducemd){
        message.error('文章简介不能为空')
        return false
       }else if(!showDate){
        message.error('发布日期不能为空')
        return false
       }
       
       let dataProps={}
       dataProps.type_id=selectedType
       dataProps.title=articleTitle
       dataProps.article_content=articleContent
       dataProps.introduce=introducemd
      //    let dateText=showDate.replace('-','/')//-替换成/
      let dateText=showDate
      //  除以1000让时间单位为秒s   
       dataProps.addTime=(new Date(dateText).getTime())/1000
      //  通过articleId===0 判断是新增还是修改
       if(articleId===0){
        //    总访问次数，可不写
          dataProps.view_count =Math.ceil(Math.random()*100)+1000
           axios({
               method:'post',
               url:servicePath.addArticle,
               data:dataProps,
               withCredentials:true
           }).then(
               res=>{
                   setArticleId(res.data.insertId)//返回回来的article_id 再次点击保存时为修改
                   //isSuccess来自中台app->controller->admin->main.js    
                   if(res.data.isSuccess){
                       message.success('文章添加成功')
                   }else{
                    message.error('文章添加失败')
                   }
                }
           )
       }else{
           dataProps.id=articleId
           axios({
               method:'post',
               url:servicePath.updateArticle,
               data:dataProps,
               withCredentials:true//路由中间件守卫
           }).then(
               res=>{
                   if(res.data.isSuccess){
                       message.success('文章修改成功')
                   }else{
                       message.error('文章修改失败')
                   }
               }
           )
       }
   }

   //从数据库中查询并显示数据
   const getArticleById=(id)=>{//使用路由守卫用withCredentials
       axios(servicePath.getArticleById+id,{withCredentials:true}).then(
           res=>{
            //    console.log(articleInfo)
               let articleInfo=res.data.data[0]
               setArticleTitle(articleInfo.title)
               setArticleContent(articleInfo.article_content)
               let html = marked(articleInfo.article_content)
               setMarkdownContent(html)
               setIntroducemd(articleInfo.introduce)
            //    markdown转换成html展现在页面上
               let tmpInt=marked(articleInfo.introduce)
               setIntroducehtml(tmpInt)
               setShowDate(articleInfo.addTime)
               setSelectType(articleInfo.typeId)
           }
       )
   }

    return(
        <div>
            {/* gutter 间距 */}
            <Row gutter={5}>
                <Col span={18}>
                    <div className="content-up"> 
                    <Row gutter={10}>
                        <div  className="title-left">
                        <Col span={23}>
                            <Input
                            value={articleTitle}
                            placeholder="博客标题"
                            size="large"
                            onChange={e=>{setArticleTitle(e.target.value)}}//赋值 获取文本框中的值
                             />
                        </Col>
                    </div>
                        <div  className="title-right">
                        <Col span={1}>
                             <Select defaultValue={selectedType} size="large" onChange={selectTypeHandle}>
                                 {
                                     typeInfo.map((item,index)=>{
                                         return (
                                         <Option key={index} value={item.Id}>{item.typeName}</Option>
                                         )
                                     })
                                 }
                             </Select>
                        </Col>
                    </div>
                    </Row>
                </div>
                    <div className="content-down">
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                              className="markdown-content"
                              rows={35}
                              placeholder="文章内容"
                              value={articleContent}
                              onChange={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className="show-html" 
                            dangerouslySetInnerHTML={{__html:markdownContent}}></div>
                        </Col>
                    </Row>
                    </div>                  
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span="24">
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button size="large" type="primary" onClick={saveArticle}>发布文章</Button>
                            <br/>
                        </Col>
                        <Col span="24">
                            <br/>
                            <TextArea
                              rows={4}
                              placeholder="文章简介"   
                              value={introducemd}
                              onChange={changeIntroduce}
                            >
                            </TextArea>
                            <br/><br/>
                            <div className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}>
                            </div>
                        </Col>
                        <Col span={14}>
                            <div className="date-select">
                                <DatePicker
                                 format="YYYY/MM/DD HH:mm:ss"
                                 placeholder="发布日期"
                                 size="large"
                                 //setShowDate让日历useState值改变
                                 onChange={(date,dateString)=>setShowDate(dateString)}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default AddArticle