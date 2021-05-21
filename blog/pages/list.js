import React,{useState,useEffect} from 'react'//useEffect生命周期
// import Head from 'next/head'
import {Row,Col,List,Breadcrumb} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Background from '../components/Background'
import {CalendarOutlined, YoutubeOutlined,FireOutlined} from '@ant-design/icons'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'//跳转
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

//Breadcrumb面包屑
// 从远端获取数据成功 用list接收（list自定义名字）
const MyList = (list) => {
  const [mylist,setMylist] = useState(list.data)
    // [
    //   {title:'今天是个好日子',context:'心想的事儿都能成哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦'},
    //   {title:'今天是个好日子',context:'心想的事儿都能成哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦'},
    //   {title:'今天是个好日子',context:'心想的事儿都能成哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦'},
    //   {title:'今天是个好日子',context:'心想的事儿都能成哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦'}
    // ]
    //当数据或页面变化时执行一次
    useEffect(()=>{
      setMylist(list.data)
    })
    const renderer=new marked.Renderer()
    marked.setOptions({
      renderer:renderer,
      gfm:true,//启动样式和github一样
      pedantic:false,//false容错
      sanitize:false,//不忽略html标签
      tables:true,//前提gfm为true 否则table无意义
      breaks:false,//不支持github换行符 前提gfm为true 否则breaks无意义
      smartLists:true,//自动渲染列表
      // 如何让代码进行高亮
      highlight:function(code){
        return hljs.highlightAuto(code).value//highlightAuto自动检测为js、css、html代码
      }
    });

  return (
    <div className="container">
      {/* <Head>
        <title>Home</title>
      </Head> */}
      <Background title={'列表页'}/>
      <Header/>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} ld={16} lg={16} xl={16}>
          
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href="/list?id=1">基础知识</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href="/list?id=2">碎碎念</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href="/comment">留言板</a></Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item=>(
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                  <a>{item.title}</a>
                  </Link>
                  </div>
                <div className="list-icon">
                  <span><CalendarOutlined type="CalendarOutlined"/> {item.addTime}</span>
                  <span><YoutubeOutlined type="YoutubeOutlined"/> {item.typeName}</span>
                  <span><FireOutlined type="FireOutlined"/> {item.view_count}人</span>
                </div>
                <div className="list-context"  dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>
              </List.Item>
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
//异步从远端获取数据
MyList.getInitialProps=async(context)=>{
  let id=context.query.id //通过上一个路由 传递一个上下文文件
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById+id).then(
      (res)=>resolve(res.data)
    )
  })
  return await promise
}
export default MyList
