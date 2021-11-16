import React from 'react';
import './App.less';
import Header from './Component/Header'
import {Button, Col, Form, Input, message, Row} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import Footer from "./Component/Footer";
const LoginForm = () =>{
    const [form] = Form.useForm();
    const onsubmit = (values)=>{
        let data = {
            'idcard':values.idcard,
            "password":values.password
        }
        fetch('/api/user/1/', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then((data)=>{
            if(data.code===200){
                message.success("登陆成功!",1,r => {
                    console.log(data.data)
                    localStorage.setItem("idcard",data.data.idcard)
                    localStorage.setItem("avatar",data.data.avatar)
                    localStorage.setItem("name",data.data.name)
                    localStorage.setItem("created_time",data.data.created_time)
                    localStorage.setItem("is_logged_in",1)
                    window.location.href = "/#/";
                })
            }else if(data.code===404){
                message.error(data.message,3)
            }
        })
    }
    return(
        <Form
            form = {form}
            name="login"
            className="login-form"
            onFinish={onsubmit}
            scrollToFirstError
        >
            <Form.Item
                name="idcard"
                rules={[{required: true, message: '请输入校园卡卡号!'}]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                       placeholder="校园卡卡号" size="large"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true, message: '请输入密码!'}]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="密码"
                    size="large"
                />
            </Form.Item>
            <Form.Item style={{fontSize: "15px"}}>
                <Button type="primary" htmlType="submit" className="login-form-button" size="large"
                        block>
                    登录
                </Button>
                <div style={{marginTop:"20px"}}>
                    <Row>
                        <Col span = {11}>
                            <a href = "#/register">
                                <Button type="dashed" className="login-form-button" size="middle"
                                        block>
                                    注册账号
                                </Button>
                            </a>
                        </Col>
                        <Col push = {2} span = {11}>
                            <a href={"#/forget_password"}>
                                <Button type="dashed" className="login-form-button" size="middle"
                                        block>
                                    忘记密码
                                </Button>
                            </a>
                        </Col>
                    </Row>
                </div>
            </Form.Item>
        </Form>
    )
}
class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        fetch('/api/user/'+localStorage.getItem("idcard"), {
            method: 'get',
            headers:{'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then((data)=>{
            console.log(data)
            if(data.code==200){
                localStorage.setItem("idcard",data.data.idcard)
                localStorage.setItem("avatar",data.data.avatar)
                localStorage.setItem("name",data.data.name)
                localStorage.setItem("created_time",data.data.created_time)
                localStorage.setItem("indentity",data.data.identity)
                localStorage.setItem("sex",data.data.sex)
                localStorage.setItem("email",data.data.email)
            }
            if(data.message==="登陆状态"){
                localStorage.setItem("is_logged_in",1)
            }else if(data.message==="非登陆状态"){
                localStorage.setItem("is_logged_in",0)
            }else if(data.code===404){
                localStorage.clear()
            }
        })
    }
    render() {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div style={{marginTop:"5%",marginBottom:document.body.clientWidth>750?"13%":"40%"}}>
                    {document.body.clientWidth>=750?
                        <div>
                            <Row>
                                <Col push={8} span={8}>
                                    <div style={{paddingLeft:"50px",paddingRight:"50px"}}>
                                        <LoginForm />
                                    </div>
                                </Col>
                            </Row>
                        </div>:
                        <div>
                            <Row>
                                <Col push={1} span={22}>
                                    <div>
                                        <LoginForm />
                                    </div>
                                </Col>
                            </Row>
                        </div>}
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        )
    }
}


export default Login;
