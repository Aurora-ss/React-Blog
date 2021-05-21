import React,{useState,useEffect} from 'react'
import {List,Row,Col,Modal,message,Button} from 'antd'
import axios from 'axios'//和数据库进行交互
import servicePath from '../config/apiUrl'
import '../static/css/ArticleList.css'
//解构
const {confirm} = Modal

function CommentList(props){

    const [list,setList]=useState([])

    useEffect(()=>{//模拟生命周期，第一次进入时获取值
        getList()
    },[])

    const getList=()=>{
        axios({
            method:'get',
            url:servicePath.getCommentList,
            withCredentials:true
        }).then(
            res=>{
                setList(res.data.list)
            }
        )
    }

    //删除评论的方法
    const deleteComment=(id)=>{
        confirm({
            title:'确定要删除这条评论吗？',
            content:'如果你点击OK按钮，评论将永远被删除，无法恢复',
            onOk(){
                axios(servicePath.deleteComment+id,{withCredentials:true}).then(
                    res=>{
                        message.success('评论删除成功')
                        getList()//重新获取列表
                    }
                )
            },
            onCancel(){
                message.success('评论没有任何变化')
            }
        })
    }

    //修改评论的跳转方法
    const updateComment=(id)=>{
        props.history.push('/index/editComment/'+id)
    }

    return (
        <div>
             <List
                header={
                    <Row className="list-div">
                        <Col span={4}>
                            <b>评论人</b>
                        </Col>
                        <Col span={6}>
                            <b>评论内容</b>
                        </Col>
                        <Col span={5}>
                            <b>邮箱</b>
                        </Col>
                        <Col span={4}>
                            <b>评论时间</b>
                        </Col>
                        <Col span={5}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={4}>
                                {item.commentName}
                            </Col>
                            <Col span={6}>
                             {item.commentContent}
                            </Col>
                            <Col span={5}>
                                {item.commentEmail}
                            </Col>
                            <Col span={4}>
                              {item.commentTime}
                            </Col>
                            <Col span={5}>
                              <Button type="primary" onClick={()=>{updateComment(item.id)}}>修改</Button>&nbsp;
                              <Button onClick={()=>{deleteComment(item.id)}}>删除 </Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
                />
        </div>
    )

}

export default CommentList