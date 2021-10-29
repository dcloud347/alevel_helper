import {Button, Form, Input, message, Modal, Radio, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import React,{useState} from "react";
let description,subject;
class Upload_Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            url:""
        }
    }
    onsubmit = (values)=>{
        description = values.description
        subject = values.subject
        description?this.setState({url:'http://localhost:8000/file/'+localStorage.getItem("idcard")+"/"+subject+"/"+description+"/"})
            : this.setState({url:'http://localhost:8000/file/'+localStorage.getItem("idcard")+"/"+subject+"/"})
    }
    render() {
        return(
            <Form
                name="upload"
                onFinish={this.onsubmit}
                scrollToFirstError
            >
                <Form.Item
                    name="subject"
                    rules={[{required: true, message: '请选择学科!'}]}
                >
                    <Radio.Group>
                        <Radio.Button value="0">Math</Radio.Button>
                        <Radio.Button value="1">Further Math</Radio.Button>
                        <Radio.Button value="2">Computer Science</Radio.Button>
                        <Radio.Button value="3">English</Radio.Button>
                        <Radio.Button value="4">Integrated English</Radio.Button>
                        <Radio.Button value="5">Physics</Radio.Button>
                        <Radio.Button value="6">Biology</Radio.Button>
                        <Radio.Button value="7">Chemistry</Radio.Button>
                        <Radio.Button value="8">Economics</Radio.Button>
                        <Radio.Button value="9">Business</Radio.Button>
                        <Radio.Button value="10">Psychology</Radio.Button>
                        <Radio.Button value="11">语文</Radio.Button>
                        <Radio.Button value="12">历史</Radio.Button>
                        <Radio.Button value="13">政治</Radio.Button>
                        <Radio.Button value="14">地理</Radio.Button>
                        <Radio.Button value="15">未知</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="description"
                >
                    <Input placeholder="文件描述(可选)" size="large"/>
                </Form.Item>
                <Form.Item style={{fontSize: "15px"}}>
                    <Upload {...{
                        name: 'file',
                        action: this.state.url,
                        headers: {
                            authorization: 'authorization-text',
                        },
                        onChange(info) {
                            if (info.file.status !== 'uploading') {
                                console.log(info.file, info.fileList);
                            }
                            if (info.file.status === 'done') {
                                message.success(`${info.file.name} file uploaded successfully`);
                            } else if (info.file.status === 'error') {
                                message.error(`${info.file.name} file upload failed.`);
                            }
                        },
                    }}>
                        <Button icon={<UploadOutlined />} type="primary" htmlType="submit"  size="large"
                                block>上传笔记</Button>
                    </Upload>
                </Form.Item>
            </Form>

        )
    }
}
const Upload_file = () => {
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
        <div>
            <Button onClick={showModal} type = "primary">
                上传笔记
            </Button>
            <Modal title="上传笔记" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Upload_Form />
            </Modal>
        </div>
    );
};

export default Upload_file;