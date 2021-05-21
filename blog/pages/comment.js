import React,{useState,useEffect} from 'react'
import '../static/style/pages/comment.css'
import {Row,Col,List, Comment, Tooltip, Avatar,Divider , Input , Button, message,Breadcrumb} from 'antd';
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Background from '../components/Background'
const {TextArea} = Input

function Comments (list) {
  const [mylist,setMylist] = useState(list.data)
  const [commentName , setCommentName] = useState('')
  const [commentContent , setCommentContent] = useState('')
  const [commentEmail , setCommentEmail] = useState('')
  // const [commentTime , setCommentTime] = useState()

  useEffect(()=>{//模拟生命周期，第一次进入时获取值
    getCommentList()
  },[])

  const getCommentList = ()=>{
    axios(servicePath.getCommentList).then(
      (res)=>{
        setMylist(res.data.list)
      }
    )
  }

  const actions = [<span key="comment-basic-reply-to">回复</span>];

  const changeContent = (e) => {
    setCommentContent(e.target.value)
  }

  const saveComment = () => {
    const qqEmailReg = /[1-9][0-9]{4,}@qq.com/
    if(!commentName){
      message.warning('请输入姓名哦~')
      return false
    }else if(!commentEmail){
      message.warning('请填入您的QQ邮箱哦~')
      return false
    }else if(!qqEmailReg.test(commentEmail)){
      message.error('啊哦！邮箱格式不合理！请重新输入哦~')
      return false
    }else if(!commentContent){
      message.warning('请输入留言内容哦~')
      return false
    }
    let dataProps = {}
    // let dateText = commentTime.replace("-","/")
    // dataProps.commentTime = (new Date(dateText).getTime())/1000
    dataProps.commentTime = new Date().getTime()/1000
    dataProps.commentEmail = commentEmail
    dataProps.commentName = commentName
    dataProps.commentContent = commentContent
    // console.log(dataProps)
    axios({
        method:'post',
        url:servicePath.addComment,
        data:dataProps,
      }).then(res =>{
        if(res.data.isSuccess){
          message.success('留言成功')
          setTimeout(()=>{
            location.reload()
          },100)    
        }else{
          message.error('留言失败')
        }
    })
  }

  const portraitArr  = (email) =>{
    // console.log(email)
    const emailString = '' + email
    const qq = emailString.split('@')[0]
    return 'http://q1.qlogo.cn/g?b=qq&nk=' + qq + '&s=100'
  }
    return(
    <div>
      <Background title={'留言页'}/>
      <Header/>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} ld={16} lg={16} xl={16}>
        <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href="/list?id=1">基础知识</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href="/list?id=2">碎碎念</a></Breadcrumb.Item>
            </Breadcrumb>
          </div>
        <Divider dashed className="divider"><span>❤ 欢迎留言 ❤</span></Divider>
        
        <div className="comment">      
        <Row gutter={10}>
        <Col span={24}>
            <Input
              className="comment-input"
              value={commentName}
              placeholder = "请输入您的姓名~"
              onChange={e=>{setCommentName(e.target.value)}}//赋值 获取文本框中的值
             />
            {/* <DatePicker
              className="comment-date"
              format="YYYY/MM/DD HH:mm:ss"
              placeholder="请选择留言时间~"
              onChange={(date,dateString)=>setCommentTime(dateString)}
            /> */}
            < Input
              className="comment-email"
              value={commentEmail}
              placeholder = "请输入您的QQ邮箱~"
              onChange={e=>{setCommentEmail(e.target.value)}}//赋值 获取文本框中的值
            />
            <TextArea
              className="comment-content"
              rows={10}
              placeholder="请提出您宝贵的意见和建议哦~"
              value={commentContent}
              onChange={changeContent}
            />
            <>
            <img className="img" src="../static/img/comment.jpg"/>
            <Button className="button" type="primary" size="large" onClick={saveComment}>点击此处留言哦~(*╹▽╹*)</Button>
            </>
        </Col>
        </Row>
        </div>
        <List
            // header={<div style={{color:'deeppink',fontSize:'20px'}}>留言板</div>}
            header={<div className="comment-header">❤ 留言板 ❤</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item=>(
                <Comment
                actions={actions}
                author={<a>{item.commentName}</a>}
                avatar={
                <Avatar
                  src={portraitArr(item.commentEmail)}
                  alt="头像"
                />
                }
                content={
                <p>
                  {item.commentContent}
                </p>
                }
                datetime={
                //  <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                 <Tooltip>
                  <span>{item.commentTime}</span>
                 </Tooltip>
                }
               />
            )}
        />
        </Col>
        <Col className="comm-right" xs={0} sm={0} ld={8} lg={6} xl={4}>
          <Author/>
          <Advert/>
        </Col>
      </Row>
      <Footer/>
    </div>
    )
}

// Comments.getInitialProps = async ()=>{
//   const promise = new Promise((resolve)=>{
//     axios(servicePath.getCommentList).then(
//       (res)=>{
//         resolve(res.list)
//       }
//     )
//   })
//   return await promise
// }
export default Comments

