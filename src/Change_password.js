import {Button, Col, Form, Input, message, Modal, Row} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import Upload_Avatar from "./Personal_center/upload_avatar";

const Change_password_Form = () =>{
    const [form] = Form.useForm();
    const onsubmit = (values)=>{
        let data = {
            'password_before':values.password_before,
            "password":values.password
        }
        fetch('/api/user/'+localStorage.getItem("idcard")+"/", {
            method: 'put',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then((data)=>{
            if(data.code==200){
                message.success("修改成功")
            }else if (data.code==403){
                message.error("原来的密码错误")
            }
        })
    }
    return(
        <Form
            form = {form}
            onFinish={onsubmit}
            scrollToFirstError
        >
            <Form.Item
                name="password_before"
                rules={[{required: true, message: '请输入原来的密码!'}]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="原来的密码"
                    size="large"
                />
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
                    确认
                </Button>
            </Form.Item>
        </Form>
    )
}


const Change_password = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        window.location.reload()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        window.location.reload()
    };

    return (
        <>
            <Button onClick={showModal}>
                更改密码
            </Button>
            <Modal title="更改密码" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Change_password_Form />
            </Modal>
        </>
    );
};
export default Change_password;