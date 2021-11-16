import React, {useState} from "react";
import '../App.less';
import {Layout, Menu, BackTop, Button, Row, Col, Image, Table, Modal} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FormOutlined,
} from '@ant-design/icons';
import Header from '../Component/Header'
import Footer from "../Component/Footer";
import option2 from "./Note";
import Upload_Avatar from "./upload_avatar";
import Change_password from "../Change_password";
const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
};
const {Content, Sider} = Layout;
const sex = ()=>{
    switch (localStorage.getItem("sex")) {
        case "0":
            return "女";
        case "1":
            return "男";
        case "2":
            return "未知";

    }
}
const data_user = [
    {
        key: '1',
        idcard: localStorage.getItem("idcard"),
        name:localStorage.getItem("name"),
        time:localStorage.getItem("created_time"),
        sex:sex(),
        email:localStorage.getItem("email")
    },
];
const columns_user = [
    {
        title: '校园卡号',
        dataIndex: 'idcard',
        key: 'idcard',
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title:'账号创建时间',
        dataIndex: 'time',
        key:'time'
    },{
        title:'性别',
        dataIndex: 'sex',
        key: 'sex'
    },{
        title:'邮箱',
        dataIndex: 'email',
        key:'email'
    }
];
const Change_avatar = () => {
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
                更改头像
            </Button>
            <Modal title="更改头像" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Upload_Avatar />
            </Modal>
        </>
    );
};
const option1 = (avatar=localStorage.getItem("avatar"))=> {
    return(
        <div>
            <div>
                <Row>
                    <Col span = {6} push = {9} style = {{marginTop:"5%"}}>
                        <Image
                            width={300}
                            src={"http://localhost:8000/media/avatar/"+avatar}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span = {2} push = {9} order = {1}>
                        <Change_avatar />
                    </Col>
                    <Col span = {2} push = {11} order = {2}>
                        <Change_password />
                    </Col>
                </Row>
                <Row>
                    <Col span = {16} push = {4} style = {{marginTop:"5%"}}>
                        <Table size = {"middle"} columns={columns_user} dataSource={data_user} pagination={false} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
const option3 = (
    <div>
        <div>
            
        </div>
    </div>
)


class Info_show extends React.Component {

    state = {
        collapsed: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            content: option1(localStorage.getItem("avatar")),
            size: "135px",
            margin: "25px",
            show: "block",
            key: 1,
            anchor_show:"block",
            data_file:[],
            data_file_publish:[],
            data_classes:[]
        };
    };
    componentDidMount() {
        fetch('/api/user/'+localStorage.getItem("idcard"), {
            method: 'get',
            headers:{'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then((data)=>{
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
        fetch('/api/file/'+localStorage.getItem("idcard")+"/", {
            method: 'get',
            headers:{'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then((data)=>{
            this.setState({data_file:data.data})
        })
        fetch('/api/file/', {
            method: 'get',
            headers:{'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then((data)=>{
            this.setState({data_file_publish:data.data})
        })
    }

    change = (key) => {
        switch (key) {
            case "1":
                return option1(this.state.avatar);
            case "2":
                return option2(this.state.data_file,this.state.data_file_publish);
            case "3":
                return option3;
            default:
                return "";
        }
    };
    onCollapse = collapsed => {
        collapsed ? this.setState({size: "40px", margin: "20px", show: "none"}) : this.setState({
            size: "135px",
            margin: "25px",
            show: "block"
        })
        this.setState({collapsed});
    };
    change_crumb0 = ({key}) => {
        let content = this.change(key)
        this.setState({key: key, content: content})
    };

    render() {
        const {collapsed} = this.state;
        return (
            <div>
                <div>
                    <Header />
                </div>
                {localStorage.getItem("is_logged_in")==1?
                    <div>
                        <Layout style={{minHeight: '100vh'}}>
                            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                                <img src={"http://localhost:8000/media/avatar/"+localStorage.getItem("avatar")} style={{
                                    width: this.state.size,
                                    height: this.state.size,
                                    margin: this.state.margin,
                                    marginBottom: "0px",
                                    borderRadius: "10px"
                                }}
                                     alt="logo" id="icon"/>

                                <div className="sign" style={{display: this.state.show}}>
                                    <h3 style={{
                                        color: "white",
                                        fontSize: "22px",
                                        textAlign:"center",
                                        marginTop:"5%"
                                    }}>{localStorage.getItem("name")}</h3>
                                </div>


                                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                    <Menu.Item key="1" icon={<DesktopOutlined/>} onClick={this.change_crumb0}>
                                        我的信息
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<FormOutlined />} onClick={this.change_crumb0}>
                                        我的笔记
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<PieChartOutlined/>} onClick={this.change_crumb0}>
                                        我的班级
                                    </Menu.Item>
                                </Menu>

                            </Sider>
                            <Layout className="site-layout">
                                <Content style={{margin: '0 16px'}}>
                                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                                        <div className="content">
                                            <div>
                                                {this.state.content}
                                            </div>
                                        </div>
                                    </div>
                                </Content>
                                <BackTop>
                                    <div style={style}>UP</div>
                                </BackTop>
                                <Footer />
                            </Layout>
                        </Layout>
                    </div>:<div>
                        <h1 style = {{textAlign:"center"}}>
                            <a href = "#/login">请先登录</a>
                        </h1>
                    </div>
                }
            </div>
        )
    }
}


export default Info_show;