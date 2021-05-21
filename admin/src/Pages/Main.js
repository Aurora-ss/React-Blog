//路由配置
import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'

//exact精确匹配 防止不正确匹配
function Main(){
    return(
        <Router>
            {/* exact精确匹配 */}
            <Route path="/" exact component={Login}/>
            {/* <Route path="/index/" exact component={AdminIndex}/> */}
            <Route path="/index/" component={AdminIndex}/>
        </Router>
    )
}

export default Main
