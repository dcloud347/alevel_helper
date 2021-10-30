import React from "react";
import Header from "../Component/Header";
import '../App.less';
import {Button, Card, Col, Divider, message, Row} from "antd";
import subjects from "../statics/image/subjects.jpg"
import class1 from "../statics/image/class.jpeg";
import note1 from "../statics/image/note.jpg";
import Footer from "../Component/Footer";
const { Meta } = Card;
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};
class G11_Home extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        fetch('/user/'+localStorage.getItem("idcard"), {
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
                <div>
                    <div style={{paddingBottom: "10px"}}>
                        <Row>
                            <Col push={1} span={22} pull = {1} >

                                <div style = {{marginTop:"3%"}}>

                                    <Row>
                                        {document.body.clientWidth>750?(
                                            <Col span = {8}>
                                                <div className="site-card-border-less-wrapper_">
                                                    <Card style={{width: "100%"}} cover={
                                                        <img alt="example" src={subjects} />
                                                    }
                                                          bordered={true}
                                                          hoverable={true}
                                                    >
                                                        <Meta
                                                            title="学科"
                                                            description="选择你的学科"
                                                        />
                                                    </Card>
                                                </div>
                                            </Col>
                                        ):""}
                                        {document.body.clientWidth>750?(
                                            <Col span = {15} push = {1}>
                                                <Row>
                                                    <Col>
                                                        <Card title={<h1 style = {{fontWeight:800,fontSize:"25px",color:"#1baeeb",textAlign:"center"}}>笔记资源</h1>}>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>Math</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>Further Math</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>Computer Science</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>English</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>Integrated English</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>Physics</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>Biology</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>Chemistry</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>Economics</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>Business</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>Psychology</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>语文</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>历史</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>政治</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1"}} size = {"large"}>地理</Button>
                                                            </Card.Grid>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        ):(
                                            <Col span = {24}>
                                                <Row>
                                                    <Col>
                                                        <Card title={<h1 style = {{fontWeight:700,fontSize:"28px",color:"#1baeeb",textAlign:"center"}}>笔记资源</h1>}>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">Math</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">FM</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">CS</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">English</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">IE</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">Physics</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">Biology</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">Chem</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">Econ</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">Bus</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">Psy</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">语文</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">历史</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">政治</Button>
                                                            </Card.Grid>
                                                            <Card.Grid  hoverable={true} style={gridStyle}>
                                                                <Button ghost style = {{color:"#4169E1",textAlign: "center"}} size = {"small"} href = "">地理</Button>
                                                            </Card.Grid>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )}

                                    </Row>

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
                                            <a href = ""> 点击创建班级</a>
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
                <div style={{marginBottom:"10%"}}>
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



export default G11_Home;