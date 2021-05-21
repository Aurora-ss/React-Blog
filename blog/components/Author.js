//Divider 分割线
import React from 'react';
import {Avatar,Divider,Tooltip} from 'antd'
import  '../static/style/components/author.css'
import {GithubOutlined,QqOutlined,WechatOutlined } from '@ant-design/icons'

const Author = () =>{
    return(
        <div className="author-div comm-box">
          <div><Avatar size={100} src="\static\img\a.png"/></div>
            <div className="author-introduction">专注于WEB和移动前端开发的小仙女
            <Divider>社交账号</Divider>
            <div className="content1">
                <Avatar size={28} className="account"/><GithubOutlined className="icon"/>
                <div className="tips1">
                    <div className="sj"></div>
                    <p className="squre">https://github.com/Aurora-ss</p>
                </div>
            </div>

            <div className="content2">
                <Avatar size={28} className="account"/><QqOutlined className="icon"/>
                <div className="tips2">
                    <div className="sj"></div>
                    <p className="squre">QQ：1915194683</p>
                </div>
            </div>

            <div className="content3">
                <Avatar size={28} className="account"/><WechatOutlined className="icon"/>
                <div className="tips3">
                    <div className="sj"></div>
                    <p className="squre">WeChat：Aurora_ss_</p>
                </div>
            </div>
          </div>
        </div>
    )
}
export default Author