import {Button} from "antd";
import React from "react";
import {Footer} from "antd/es/layout/layout";
import {message} from "antd";
const copy_text = ()=>{
    let copyDOM = document.getElementById("code");  //需要复制文字的节点
    let range = document.createRange(); //创建一个range
    window.getSelection().removeAllRanges();   //清楚页面中已有的selection
    range.selectNode(copyDOM);    // 选中需要复制的节点
    window.getSelection().addRange(range);   // 执行选中元素
    let successful = document.execCommand('copy');    // 执行 copy 操作
    if(successful){
        message.success('复制成功！')
    }else{
        message.warning('复制失败。')
    }
    // 移除选中的元素
    window.getSelection().removeAllRanges();
}

const Alevel_Footer = () =>{
    return(
        <div>
            <Footer style={{textAlign: 'center',fontSize:"10px"}}>
                    <span>
                       Alevel Helper website©2021 Created by 寰桐阁HCC网络技术社
                    </span>
                <span id = "code">寰桐阁HCC网络技术社</span>
                <Button type="dashed" onClick = {copy_text} style = {{marginLeft:"10px"}}>复制</Button>
                <span style = {{marginLeft:"10px"}}>
                        寰桐阁HCC网络技术社
                    </span>
                <a href = "https://beian.miit.gov.cn/#/Integrated/index" style={{marginLeft:"10px"}} target="_blank">
                    #
                </a>
            </Footer>
        </div>
    )
}


export default Alevel_Footer;
