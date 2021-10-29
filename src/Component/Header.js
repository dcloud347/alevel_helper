import React from 'react';
import {Col, Menu, Row,Avatar} from "antd";
import {AppstoreOutlined, BarsOutlined,UserOutlined,UserAddOutlined,SettingOutlined} from "@ant-design/icons";
const { SubMenu } = Menu;


const Header = ()=>{
        return (
            <div className="Header">
                {document.body.clientWidth>750?
                    (
                        <div><Row>
                            <Col span={10} order={1}>
                                <Menu mode="horizontal">
                                    <Menu.Item icon={<AppstoreOutlined/>}>
                                        <a href="/" >主页</a>
                                    </Menu.Item>
                                    <Menu.Item icon={<BarsOutlined/>}>
                                        <a href = "">高一</a>
                                    </Menu.Item>
                                    <Menu.Item icon={<BarsOutlined/>}>
                                        <a href = "#/G11">高二</a>
                                    </Menu.Item>
                                    <Menu.Item icon={<BarsOutlined/>}>
                                        <a href="/">高三</a>
                                    </Menu.Item>
                                </Menu>
                            </Col>
                            <Col span = {4} order = {2} style = {{fontSize:"29.5px",textAlign:"center"}}>
                                <span style={{fontFamily:"alibaba",fontWeight:"bold",color:"#000080"}}>Alevel Helper</span>
                            </Col>

                                {localStorage.getItem("is_logged_in")==1?
                                        <Col span = {5} order = {3} push = {5} >
                                            <Menu mode = "horizontal">
                                                <Menu.Item>
                                                    <span style={{fontFamily:"alibaba",fontweight:"bold"}}>
                                                {localStorage.getItem("name")}
                                            </span>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <a>
                                                        <Avatar src={"http://localhost:8000/media/avatar/"+localStorage.getItem("avatar")} shape ={"circle"} size = {"large"} alt = "avatar"
                                                                style = {{verticalAlign:"center"}} gap = {1} />
                                                    </a>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <a href = "#/personal_center">
                                                        我的主页
                                                    </a>
                                                </Menu.Item>
                                            </Menu>

                                        </Col>

                                    :
                                    <Col span = {4} order = {3} push = {6}>
                                        <Menu mode="horizontal">
                                            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="登录 Alevel helper">
                                                <Menu.ItemGroup>
                                                    <Menu.Item icon={<UserOutlined />}>
                                                        <a href = "#/login">登陆</a>
                                                    </Menu.Item>
                                                    <Menu.Item icon={<UserAddOutlined />}>
                                                        <a href = "#/register">注册</a>
                                                    </Menu.Item>
                                                </Menu.ItemGroup>
                                            </SubMenu>
                                        </Menu>
                                    </Col>

                                }

                        </Row>
                        </div>
                    ):(
                        <div>
                            <Row>
                                <Col span={6} order={1}>
                                    <Menu mode="horizontal" theme = {"light"}>
                                        <Menu.Item icon={<AppstoreOutlined/>}>
                                            <a href="">主页</a>
                                        </Menu.Item>
                                        <Menu.Item icon={<BarsOutlined/>}>
                                            <a href = "">高一</a>
                                        </Menu.Item>
                                        <Menu.Item icon={<BarsOutlined/>}>
                                            <a href = "#/G11">高二</a>
                                        </Menu.Item>
                                        <Menu.Item icon={<BarsOutlined/>}>
                                            <a href="">高三</a>
                                        </Menu.Item>
                                    </Menu>
                                </Col>
                                <Col span = {12} order = {2} style = {{fontSize:"24px",textAlign:"center"}}>
                                    <span style={{fontFamily:"alibaba",fontWeight:"bold",color:"#000080"}}>Alevel Helper</span>
                                </Col>
                                {localStorage.getItem("is_logged_in")==1?
                                    <Col span = {4} order = {3} push = {3} >
                                        <Menu mode = "horizontal">
                                            <Menu.Item>
                                                    <span style={{fontFamily:"alibaba",fontweight:"bold"}}>
                                                {localStorage.getItem("name")}
                                            </span>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <a>
                                                    <Avatar src={"http://localhost:8000/media/avatar/"+localStorage.getItem("avatar")} shape ={"circle"} size = {"large"} alt = "avatar"
                                                            style = {{verticalAlign:"center"}} gap = {1} />
                                                </a>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <a href = "#/personal_center">
                                                    我的主页
                                                </a>
                                            </Menu.Item>
                                        </Menu>

                                    </Col>

                                    :
                                    <Col span = {1} order = {3} push = {3}>
                                        <Menu mode="horizontal">
                                            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="登录 Alevel helper">
                                                <Menu.ItemGroup>
                                                    <Menu.Item icon={<UserOutlined />}>
                                                        <a href = "#/login">登陆</a>
                                                    </Menu.Item>
                                                    <Menu.Item icon={<UserAddOutlined />}>
                                                        <a href = "#/register">注册</a>
                                                    </Menu.Item>
                                                </Menu.ItemGroup>
                                            </SubMenu>
                                        </Menu>
                                    </Col>
                                }
                            </Row>
                        </div>
                    )
                }
            </div>)
    }
export default Header;
