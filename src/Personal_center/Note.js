import {Button, Col, Row, Space, Table, message, Popconfirm, Divider} from "antd";
import React from 'react'
import Upload_file from "./upload_file";
const columns_file = [
    {
        title: '文件(点击文件名下载)',
        dataIndex: 'file',
        key: 'file',
        render: (text) => <a href = {"http://localhost:8000/media/file/"+localStorage.getItem("idcard")+"/"+text} >{text}</a>
    },
    {
        title: '所有者',
        dataIndex: 'owner',
        key: 'owner',
    },
    {
        title:'文件上传时间',
        dataIndex: 'uploaded_time',
        key:'uploaded_time'
    },
    {
        title:'学科',
        dataIndex: 'subject',
        key:'subject'
    },
    {
        title:'描述',
        dataIndex: 'description',
        key:'description'
    },{
        title: '是否公开',
        dataIndex: 'public',
        key:'public'
    },{
        title:"Actions",
        dataIndex: "Action",
        key:"action",
        render: (text, record) => (
            <Space size="middle">
                <Popconfirm
                    title="你确定要设置这个文件吗?"
                    onConfirm={() =>{
                        let data = {
                            'publish':record.public=="私密"?1:0
                        }
                        fetch('/file/'+record.id+"/", {
                            method: 'put',
                            body:JSON.stringify(data),
                            headers:{'Content-Type': 'application/json'}
                        }).then(response => {
                            return response.json();
                        }).then((data)=>{
                            console.log(data)
                            if(data.code==200){
                                message.success("设置成功!")
                            }
                        })
                        window.location.reload()
                    }}
                    okText={record.public=="私密"?"设为公开":"设为私密"}
                    cancelText="取消"
                >
                    <Button >{record.public=="私密"?"设为公开":"设为私密"}</Button>
                </Popconfirm>
                <Popconfirm
                    title="你确定要删除这个文件吗?"
                    onConfirm={() =>{
                        fetch('/file/'+record.id+"/", {
                            method: 'delete',
                            headers:{'Content-Type': 'application/json'}
                        }).then(response => {
                            return response.json();
                        }).then((data)=>{
                            console.log(data)
                            if(data.code==204){
                                message.success("删除成功!")
                            }
                        })
                        window.location.reload()
                    }}
                    okText="删除"
                    cancelText="取消"
                >
                    <Button>删除</Button>
                </Popconfirm>
            </Space>
        ),
    }
];
const columns_file_publish = [
    {
        title: '文件(点击文件名下载)',
        dataIndex: 'file',
        key: 'file',
        render: (text) => <a href = {"http://localhost:8000/media/file/"+localStorage.getItem("idcard")+"/"+text} >{text}</a>
    },
    {
        title: '所有者',
        dataIndex: 'owner',
        key: 'owner',
        render:(text) => <a>{text}</a>
    },
    {
        title:'文件上传时间',
        dataIndex: 'uploaded_time',
        key:'uploaded_time'
    },
    {
        title:'学科',
        dataIndex: 'subject',
        key:'subject'
    },
    {
        title: '描述',
        dataIndex: 'description',
        key: 'description'
    }
];
const subject = (key) =>{
    switch (key) {
        case 0 :
            return "Math"
        case 1:
            return "Further Math";
        case 2:
            return "Computer Science";
        case 3:
            return "English";
        case 4:
            return "Integrated English";
        case 5:
            return "Physics";
        case 6:
            return "Biology";
        case 7:
            return "Chemistry";
        case 8:
            return "Economics";
        case 9:
            return "Business";
        case 10:
            return "Psychology";
        case 11:
            return "语文";
        case 12:
            return "历史";
        case 13:
            return "政治";
        case 14:
            return "地理";
        case 15:
            return "未知";
        default:
            return "";
    }
}
const public_ = (key)=>{
    switch (key){
        case 0:
            return "私密";
        case 1:
            return "公开";
        default:
            return ""
    }
}

const option2 = (data_file,data_file_publish)=>{
    const originData = []
    const originData_publish=[]
    for (let i = 0; i < data_file.length; i++) {
        originData.push({
            key: i.toString(),
            file: data_file[i]["file"],
            owner:data_file[i]["owner"],
            uploaded_time:data_file[i]["uploaded_time"],
            subject:subject(data_file[i]["subject"]),
            description:data_file[i]["description"],
            public:public_(data_file[i]["publish"]),
            id:data_file[i]["id"]
        });
    }
    for (let a = 0; a < data_file_publish.length; a++) {
        originData_publish.push({
            key: a.toString(),
            file: data_file_publish[a]["file"],
            owner:data_file_publish[a]["owner"],
            uploaded_time:data_file_publish[a]["uploaded_time"],
            subject:subject(data_file_publish[a]["subject"]),
            description:data_file_publish[a]["description"],
            id:data_file_publish[a]["id"]
        });
    }
    return(
        <div>
            <Row>
                <Col span = {2} push = {11}>
                    <h1 style={{textAlign:"center",fontSize:"23px"}}>我的笔记</h1>
                </Col>
            </Row>
            <div>
                <Row>
                    <Col span = {2} push = {11} style = {{marginTop:"5%",marginBottom:"5%"}}>
                        <Upload_file />
                    </Col>
                </Row>
                <Row>
                    <Col span = {20} push = {2}>
                        <Table size = {"middle"} columns={columns_file} dataSource={originData} pagination={false} />
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span = {4} push = {10} style = {{marginTop:"5%"}}>
                        <h1 style={{textAlign:"center",fontSize:"23px"}}>公开的文件</h1>
                    </Col>
                </Row>
                <Row>
                    <Col span = {20} push = {2}>
                        <Table size = {"middle"} columns={columns_file_publish} dataSource={originData_publish} pagination={false} />
                    </Col>
                </Row>
            </div>
        </div>
        )
}






export default option2;