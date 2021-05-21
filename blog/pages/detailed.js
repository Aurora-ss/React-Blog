import React from 'react'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Background from '../components/Background'
import '../static/style/pages/detailed.css'
import {Row,Col,Breadcrumb,Affix} from 'antd'
import { CalendarOutlined,FireOutlined,BellOutlined} from '@ant-design/icons'
import '../static/style/pages/detailed.css'
// import ReactMarkdown from 'react-markdown'
// import MarkNav from 'markdown-navbar'
// import 'markdown-navbar/dist/navbar.css'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'

// 获得接口数据 用props传递过来
const Detailed = (props) => {
  // tocify.tsx用了接口形式 所以用ts
  const tocify=new Tocify()
  //使用marked必须用到
  const renderer=new marked.Renderer()
  // ###(level等级) ss(文本)  ### ss
  renderer.heading=function(text,level,raw){
    const anchor =tocify.add(text,level)
    // 自定义a标签--带锚链接形式
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }
// 配置marked
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
//markdown转换成html
  let html=marked(props.article_content)
  // let markdown=
  // '# \n\n\n' +
  // '# p01:课程介绍和环境搭建\n' +
  // '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  // '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
  //  '**这是加粗的文字**\n\n' +
  // '*这是倾斜的文字*`\n\n' +
  // '***这是斜体加粗的文字***\n\n' +
  // '~~这是加删除线的文字~~ \n\n'+
  // '\`console.log(111)\` \n\n'+
  // '# p02:来个Hello World 初始Vue3.0\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n'+
  // '***\n\n\n' +
  // '# p03:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '# p04:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '#5 p05:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '# p06:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '# p07:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '``` var a=11; ```'

  return (
    <div>
      <Background title={'详细页'}/>
      <Header/>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} ld={16} lg={16} xl={16}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="">{props.typeName}</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                <Breadcrumb.Item><a href="/comment">留言板</a></Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">{props.title}</div>
              <div className="list-icon center">
                <span><CalendarOutlined/>{props.addTime}</span>
                <span><BellOutlined/>{props.typeName}</span>
                <span><FireOutlined/> {props.view_count}人</span>
              </div>
              {/* dangerouslySetInnerHTML={{__html:html}} 解析html*/}
              <div className="detailed-content" dangerouslySetInnerHTML={{__html:html}}>
                {/* <ReactMarkdown
                 source={markdown}
                 //是否进行html转换
                 escapeHtml={false}
                /> */}
              </div>
            </div>
          </div>
        </Col>
        
        <Col className="comm-right" xs={0} sm={0} ld={8} lg={6} xl={4}>
          <Author/>
          <Advert/>
          {/* Affix固定效果 */}
          <Affix offsetTop={5}>
          <div className="detailed-nav comm-box">
            <div className="nav-title">文章目录</div>
            {/* <MarkNav
             className="article-menu"
            //  source={markdown}
            source={html}
            //  headingTopOffset={0} 锚点距离顶部的距离 默认为0
             ordered={false}//是否有编号
            /> */}
            <div className="toc-list">{tocify && tocify.render()}</div>
           </div>
          </Affix>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

// 接收前台index.js页面标（标题处）传过来的id
Detailed.getInitialProps= async(context)=>{//context上下文：接收前台传过来的id
  // console.log(context.query.id)//生成数组
  let id=context.query.id
  const promise=new Promise((resolve)=>{
    // 通过axios请求接口 http://127.0.0.1:7001/default/getAtricleById
    axios(servicePath.getArticleById+id).then(
      (res)=>{
        // console.log(res)
        resolve(res.data.data[0])
      }
    )
  })
  return await promise //必须有返回值
}
export default Detailed