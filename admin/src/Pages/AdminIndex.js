import React,{useState} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../static/css/AdminIndex.css'
import {Route} from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import CommentList from './CommentList'
import EditComment from './EditComment'

const { Content, Footer, Sider } = Layout; //Header,
const { SubMenu } = Menu;

  function AdminIndex(props){
    //左导航栏 false为展开
    const [collapsed,setCollapsed ] =useState(false)
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };
    // 要使用key所以传入e
    const handleClickArticle = e=>{
      // console.log(e.item.props)
      if(e.key==='addArticle'){
        // 跳转页面
        props.history.push('/index/add')
      }else{
        props.history.push('/index/list')
      }
    }
    const handleMenuClick = (e) => {
      console.log(e)
      if(e.key === "commentList"){
        props.history.push('/index/commentList')
      }
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
            <Menu.Item key="1">
              <PieChartOutlined />
              <span>工作台</span>
            </Menu.Item>
            <Menu.Item key="2">
              <DesktopOutlined />
              <span>添加文章</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              onClick={handleClickArticle}
              title={
                <span>
                  <UserOutlined />
                  <span>文章管理</span>
                </span>
              }
            >
              <Menu.Item key="addArticle" >添加文章</Menu.Item>
              <Menu.Item key="articleList">文章列表</Menu.Item>
            </SubMenu>
            <Menu.Item key="commentList">
              <FileOutlined />
              <span>留言管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div>
                 <Route path="/index/" exact  component={AddArticle} />
                 <Route path="/index/add/"  exact  component={AddArticle} />
                 <Route path="/index/list/" exact component={ArticleList} />
                 <Route path="/index/add/:id" exact component={AddArticle} />
                 <Route path="/index/commentList" exact component={CommentList} />
                 <Route path="/index/editComment/:id" exact component={EditComment} />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Aurora-ss.com </Footer>
        </Layout>
      </Layout>
    );
}        

export default AdminIndex