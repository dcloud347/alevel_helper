import {Upload, message, Form, Button} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React from "react";
let startupload = true;
let file_type;
class Upload_Avatar extends React.Component {
    state = {
        uploading: false
    };

    beforeUpload = (file)=> {
        this.setState({avatar_name:file.name})
        file_type = file.name
        file_type = file_type.split(".")
        file_type = file_type[file_type.length-1]
        this.setState({'file':file})
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('你只能上传JPG/PNG文件!');
            }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('文件必须小于2MB!');
        }
        startupload=false
            return false;
                }
    onsubmit = (values,info)=>{
        let file = this.state.file
        const formData = new FormData();
        console.log(file,info)
        formData.append('avatar', file);
        this.setState({
            uploading: true,
        });
        fetch("http://localhost:8000/api/avatar/"+localStorage.getItem("idcard")+"/" ,{
            method: 'post',
            body: formData
        }).then(response => {
            return response.json();
        }).then((data)=>{
            console.log(info)
            if(data.code===200){
                this.setState({
                    imageUrl:"http://localhost:8000/media/avatar/"+localStorage.getItem("idcard")+"."+file_type,
                    uploading: false,
                })

                message.success('上传成功');
            }else if(data.code===403){
                this.setState({
                    uploading: false,
                });
                message.error('请先登录');
            }
        })
    }
    render() {
        const { loading, imageUrl } = this.state;
        const { uploading} = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>{this.state.avatar_name?this.state.avatar_name:"Upload"}</div>
            </div>
        );
        return (
            <Form
                name="upload"
                onFinish={this.onsubmit}
            >
                <Form.Item>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={this.beforeUpload}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                    <Button
                        type="primary"
                        disabled={startupload}
                        style={{ marginTop: 16 }}
                        htmlType = "submit"
                    >
                        {uploading ? '上传中' : '开始上传'}
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
export default Upload_Avatar;