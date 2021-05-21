import React,{useState} from 'react'
import 'antd/dist/antd.css'
import {Card,Input,Button,Spin,message} from 'antd'
import {UserOutlined,KeyOutlined} from'@ant-design/icons'
import '../static/css/Login.css'
//远端接口访问
import axios from 'axios'
import servicePath from '../config/apiUrl'

function Login(props){
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const checkLogin=()=>{
        setIsLoading(true)
        if(!userName){
            message.error('用户名不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }else if(!password){
            message.error('密码不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }
        //定义对象
        let dataProps={
            'userName':userName,
            'password':password
        }
        axios({
            method:'post',
            url:servicePath.checkLogin,
            data:dataProps,
            withCredentials:true//前后端共享session
        }).then(//成功
            res=>{
                setIsLoading(false)//可重复提交
                console.log(res)
                // 去conrtller->admin->main.js中查找
                if(res.data.data==='登录成功'){
                    // 缓存localStorage
                    localStorage.setItem('openId',res.data.openId)
                    //使用编程导航形式进行跳转用到props.history
                    // console.log(props)
                    props.history.push("/index")
                }else{
                    message.error('用户名密码错误')
                }
            }
        )
    }

//Span 旋转加载  防止重复提交
    return(
        <div className="login-div">
            <Spin tip="loading..." spinning={isLoading}>
                <Card title="Aurora-ss Blog System" bordered={true} style={{width:400}}>
                    <Input
                       id={1}
                       size="large"
                       placeholder="Enter your username"
                      //前缀    
                       prefix={<UserOutlined style={{color:'rgba(0,0,0,.25)'}}/>}
                      //e为文本框本身    
                       onChange={(e)=>{setUserName(e.target.value)}}
                    />
                    <br/><br/>

                    <Input.Password
                       id={2}
                       size="large"
                       placeholder="Enter your password"
                       prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}}/>}
                       onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <br/><br/>
                    {/* block块级元素 */}
                    <Button type="primary" size="large" block onClick={checkLogin}>Login</Button>
                    <br/><br/>
                </Card>
            </Spin>
        </div>
    )
}

export default Login