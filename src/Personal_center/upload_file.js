import {Button, Form, Input, message, Modal, Radio, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import React,{useState} from "react";
let description,subject;
class Upload_Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
        }
    }
    onsubmit = (values)=>{
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        });
        this.setState({
            uploading: true,
        });
        let url;
        description = values.description
        subject = values.subject
        description?url = 'http://localhost:8000/api/file/'+localStorage.getItem("idcard")+"/"+subject+"/"+description+"/"
            :url='http://localhost:8000/api/file/'+localStorage.getItem("idcard")+"/"+subject+"/";
        fetch(url ,{
            method: 'post',
            body: formData
        }).then(response => {
            return response.json();
        }).then((data)=>{
            if(data.code===200){
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                message.success('上传成功');
            }else if(data.code===403){
                this.setState({
                    uploading: false,
                });
                message.error('请先登录');
            }else if(data.code===400){
                this.setState({
                    uploading: false,
                });
                message.error('文件名已经存在');
            }
        })
    }
    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };
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
                    <Upload {...props} name="file" maxCount = {1} showUploadList={false}>
                        <Button icon={<UploadOutlined />} style ={{marginLeft:"-10%"}}>上传文件</Button>
                    </Upload>
                    <Button
                        type="primary"
                        disabled={fileList.length === 0}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                        htmlType = "submit"
                    >
                        {uploading ? '上传中' : '开始上传'}
                    </Button>
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