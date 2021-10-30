import React,{lazy,Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {ConfigProvider} from "antd";
import zhCN from 'antd/lib/locale/zh_CN';
import {Route, Router,hashHistory} from "react-router";
const Home = lazy(() => import('./Home'));
const G11_Home = lazy(() => import('./G11/G11_home'));
const Register = lazy(() => import('./Register'));
const Login = lazy(() => import('./Login'));
const Personal_center = lazy(()=>import('./Personal_center/Personal_center'))
const Forget_password = lazy(()=>import('./Forget_password') )
ReactDOM.render(
    <Suspense fallback={
        <div style={{textAlign:"center",width:document.body.clientWidth,height:document.body.clientHeight*0.45}}>
            <span style = {{fontFamily:"alibaba",fontSize:"20px"}}>加载中</span>
        </div>}>
        <ConfigProvider locale={zhCN}>
            <Router history={hashHistory}>
                <Route path="/" component={Home}/>
                <Route path="/G11" component={G11_Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/personal_center" component={Personal_center}/>
                <Route path="/forget_password" component={Forget_password} />
            </Router>
        </ConfigProvider>
    </Suspense>
  ,
  document.getElementById('root')
);

reportWebVitals();
