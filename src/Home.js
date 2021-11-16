import React from "react";
import Header from "./Component/Header";
import './App.less';
import {Card, Carousel, Col, Divider, Image, message, Row} from "antd";
import pic1 from "./statics/image/1.png";
import pic2 from "./statics/image/2.jpg";
import pic3 from "./statics/image/3.png";
import class1 from "./statics/image/class.jpeg";
import note1 from "./statics/image/note.jpg";
import Footer from "./Component/Footer";
class Home extends React.Component{
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
    }

    render() {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    <div style={{backgroundColor: "#1D2A3B"}}>
                        <Row>
                            <Col push={4} span={16}>
                                <div>
                                    <Carousel autoplay>
                                        <div>
                                            <Image
                                                width={document.body.clientWidth*0.65}
                                                height={document.body.clientWidth*350/681*(0.65)}
                                                src={pic1}
                                            />
                                        </div>
                                        <div>
                                            <Image
                                                width={document.body.clientWidth*0.65}
                                                height={document.body.clientWidth*350/681*(0.65)}
                                                src={pic2}
                                            />
                                        </div>
                                        <div>
                                            <Image
                                                width={document.body.clientWidth*0.65}
                                                height={document.body.clientWidth*350/681*(0.65)}
                                                src={pic3}
                                            />
                                        </div>
                                    </Carousel>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Divider />
                <div>
                    <Row>
                        <Col span = {document.body.clientWidth>750?14:20} push = {document.body.clientWidth>750?5:2} >
                            <div className="site-card-border-less-wrapper">
                                    <Row>
                                        <Col span = {12}>
                                            <Card title="创建班级" bordered={false} style={{ width: "95%" }}>
                                                <a href = "#/class"> 点击创建班级</a>
                                                <img src={class1} alt="alevel" style = {{width:"95%",borderRadius:"100%"}} />
                                            </Card>
                                        </Col>
                                        <Col span = {12}>
                                            <h1>
                                                <p style={{fontFamily:"alibaba",fontSize:document.body.clientWidth>750?"30px":"22px",color:"skyblue"}}>创建你的班级来让学生填写他们对知识掌握的情况吧！</p>
                                            </h1>
                                        </Col>
                                    </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Divider />
                <div style={{marginBottom:document.body.clientWidth>750?"10%":"10%"}}>
                    <Row>
                        <Col span = {document.body.clientWidth>750?14:20} push = {document.body.clientWidth>750?5:2}>
                            <div className="site-card-border-less-wrapper">
                                <Row>
                                    <Col span = {12}>
                                        <Card title="上传笔记" bordered={false} style={{ width: "95%" }}>
                                            <a href = "#/personal_center"> 点击上传笔记</a>
                                            <img src={note1} alt="alevel" style = {{width:"95%",borderRadius:"100%"}} />
                                        </Card>
                                    </Col>
                                    <Col span = {12}>
                                        <h1>
                                            <p style={{fontFamily:"alibaba",fontSize:document.body.clientWidth>750?"30px":"22px",color:"#191970"}}>上传你的笔记让更多人看到吧！</p>
                                        </h1>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        );
    }

}



export default Home;