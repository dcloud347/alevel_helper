import React from 'react';
import {Col, Menu, Row} from "antd";
import {AppstoreOutlined, BarsOutlined, CloudOutlined, GlobalOutlined} from "@ant-design/icons";
const {SubMenu} = Menu;
const Head = (props) => {
    return (
        <div className="Header">
            <Row>
                <Col span={24} order={1}>
                    <Menu mode="horizontal">
                        <Menu.Item icon={<AppstoreOutlined/>}>
                            <a href="">主页</a>
                        </Menu.Item>
                        <Menu.Item icon={<CloudOutlined/>}>
                            <a href = "">高一</a>
                        </Menu.Item>
                        <Menu.Item icon={<AppstoreOutlined/>}>
                            <a href = "">高二</a>
                        </Menu.Item>
                        <Menu.Item icon={<BarsOutlined/>}>
                            <a href="">高三</a>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>)
}
