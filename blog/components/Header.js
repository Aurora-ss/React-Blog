import React,{useState,useEffect} from 'react'
import '../static/style/components/header.css'
import {Row,Col,Menu} from 'antd'
import {createFromIconfontCN,HomeOutlined,HeartOutlined } from '@ant-design/icons'
import Router from 'next/router'
// import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1864121_nez2lv25bqj.js',
  });
// 箭头函数后为()自动有返回值
const Header = () => {
    //navArray自定义名称
    const [navArray,setNavArray]=useState([])
    // 第二个参数为[]，只有第一次进入组件时执行一次 
    // useEffect本身就是异步，里边不能直接使用异步，可以定义一个异步的方法
    // const result = await axios() 不可以这样使用
    useEffect(()=>{
        const fetchData=async()=>{
            const result=await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    // setaNavArray(res.data.data)
                    return res.data.data
                }
            )
            // 在方法外进行赋值
            setNavArray(result)
        }
        fetchData()
    },[])
    // e取Menu传递的key
    const handleClick=(e)=>{
        if(e.key==0){//0配置成首页
           Router.push('/index')//跳转到首页
        }else if(e.key == 3){
            Router.push('/comment')
        }else{
            // query形式传递参数
            Router.push('/list?id='+e.key)
        }
    }

    return(
    <div className="header">
        <Row type="flex" justify="center">
           <Col xs={15} sm={17} ld={17} lg={15} xl={15}>
             <span className="header-logo">Aurora-ss</span>
             <span className="header-txt">专注前端开发</span>
           </Col>
           <Col xs={8} sm={6} md={6} lg={7} xl={7}>
             <Menu mode="horizontal" onClick={handleClick}>
                 <Menu.Item key="0">
                     <HomeOutlined type="HomeOutlined"/>首页
                 </Menu.Item>
                {
                     navArray.map((item)=>{
                         return(
                            <Menu.Item key={item.Id}>
                            <IconFont type={item.icon} />{item.typeName}&nbsp;
                            </Menu.Item>
                         )
                     })

                 }
                <Menu.Item key="3">
                     <HeartOutlined type="HeartOutlined" />留言板
                </Menu.Item>
             </Menu>
           </Col>
        </Row>
    </div>
)
}
export default Header