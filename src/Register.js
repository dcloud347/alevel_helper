import React from 'react';
import './App.less';
import Header from './Component/Header'
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    Radio,
    message
} from 'antd';
import Footer from "./Component/Footer";
import 'whatwg-fetch'
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const RegistrationForm = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        let data = {
            'name': values.name,
            'email': values.email,
            'password': values.password,
            'idcard':values.idcard,
            'sex':values.sex
        }
        fetch('/api/user/2/', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        }).then(response => {
            return response.json()
        }).then((data)=>{
            console.log(data)
            if(data.code===201){
                message.success("注册成功!",1,r => {
                    window.location.href = "/#/login"
                })
            }else if(data.code===400){
                message.error("此学生卡号已经有人注册过")
            }
        })
    };
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="name"
                label="姓名"
                tooltip="真实姓名"
                rules={[
                    {
                        required: true,
                        message: '请输入真实姓名!',
                        whitespace: true,
                    },
                ]}
            >
                <Input size="large"/>
            </Form.Item>
            <Form.Item
                name="idcard"
                label="校园卡号"
                tooltip="校园卡号"
                rules={[
                    {
                        required: true,
                        message: '请输入校园卡号!',
                        whitespace: true,
                    },
                ]}
            >
                <Input size="large"/>
            </Form.Item>
            <Form.Item
                name="email"
                label="邮箱"
                rules={[
                    {
                        type: 'email',
                        message: '这不是一个有效的邮箱!',
                    },
                    {
                        required: true,
                        message: '请输入你的邮箱!',
                    },
                ]}
            >
                <Input size="large"/>
            </Form.Item>

            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码!',
                    },
                    () => ({
                        validator(_, value) {
                            if (!value || (value.length >= 6 && value.length <= 16)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('密码应该在6到16位!'));
                        },
                    })
                ]}
                hasFeedback
            >
                <Input.Password size="large"/>
            </Form.Item>

            <Form.Item
                name="confirm"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入确认密码!',
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('两次输入的密码不同!'));
                        },
                    }),
                ]}
            >
                <Input.Password size="large"/>
            </Form.Item>
            <Form.Item
                name="sex"
                label="性别"
                rules={[
                    {
                        required: true,
                        message: '请选择你的性别'
                    }
                ]}
            >
                <Radio.Group buttonStyle="solid">
                    <Radio.Button value={1}>男</Radio.Button>
                    <Radio.Button value={0}>女</Radio.Button>
                    <Radio.Button value={2}>未知</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    注册
                </Button>
            </Form.Item>
        </Form>
    );
};

class Register extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div style={{marginTop:"5%",marginBottom:"10%"}}>
                    {document.body.clientWidth >= 900 ?
                        <div>
                            <Row>
                                <Col span={12} push={5}>
                                    <RegistrationForm/>
                                </Col>
                            </Row>
                        </div> :
                        <div>
                            <Row>
                                <Col span={22} push={1}>
                                    <RegistrationForm/>
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

export default Register;