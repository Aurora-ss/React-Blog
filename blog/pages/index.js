import React,{useState} from 'react'
import {Row,Col,List,Breadcrumb} from 'antd'
import '../static/style/pages/index.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Background from '../components/Background'
import {CalendarOutlined, BellOutlined,FireOutlined} from '@ant-design/icons'
import axios from 'axios'
import Link from 'next/link'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

// 把远端获取的数据放到页面中 可以接收一个参数list（自定义名字）
const Home = (list) => {
  //list.data为数组形式
  const [mylist,setMylist] = useState(list.data)
    const renderer = new marked.Renderer();
    marked.setOptions({
      renderer: renderer,
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
      sanitize:false,
      xhtml: false,
      highlight: function (code) {
              return hljs.highlightAuto(code).value;
      }
    }); 

  return (
    <div className="container">
      <Background title={'首页'}/>
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
            renderItem={item=>(//jsx语法
              <List.Item>
                <div className="list-title">
                  {/* 从首页跳转到详细页 */}
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                  <a>{item.title}</a>
                  </Link>
                  </div>
                <div className="list-icon">
                  <span><CalendarOutlined type="CalendarOutlined"/> {item.addTime}</span>
                  <span><BellOutlined type="YoutubeOutlined"/> {item.typeName}</span>
                  <span><FireOutlined type="FireOutlined"/>{item.view_count}人</span>
                </div>
                <div className="list-context" 
                dangerouslySetInnerHTML={{__html:marked(item.introduce)}}>
                </div>
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
//异步从远端获取数据 async必须有返回值且必须使用await
Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        // console.log('---->',res.data)
        resolve(res.data)
      }
    )
  })
  return await promise
}
export default Home
