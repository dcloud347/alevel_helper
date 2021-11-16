import {Button, Form, message, Checkbox, Skeleton} from "antd";
import React from "react";
class Partially_publish_Form extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            loading:true
        }
    }

    componentDidMount() {
        fetch('/api/users/'+localStorage.getItem("idcard"), {
            method: 'get',
            headers:{'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then((data)=>{
            if(data.code==200){
                let names=data.data.name;
                let idcards=data.data.idcard;
                let options=[]
                for(let i=0;i<names.length;i++){
                    options.push({label:names[i],value:idcards[i]})
                }
                this.setState({loading:false,options:options})
            }else if(data.code===403){
                message.error("请先登录")
            }else if(data.code===404){
                message.error("用户不存在")
            }
        })
    }

    onsubmit = (values)=>{
        let publishlist = ""
        for (let i =0;i<values.list.length;i++){
            publishlist = publishlist+values.list[i]+"/"
        }
        let data = {"publish_list":publishlist,"publish":2}
        fetch('/api/file/'+this.props.id.id.toString()+"/", {
            method: 'put',
            body:JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then((data)=>{
            if(data.code==200){
                message.success("设置成功!")
            }
        })
    }
    render() {
        return(
            this.state.loading?
                <Skeleton />:(
                    <Form
                        name="Partially_publish"
                        onFinish={this.onsubmit}
                        scrollToFirstError
                    >
                        <Form.Item style={{fontSize: "15px"}} name = "list">
                            <Checkbox.Group options={this.state.options} />
                        </Form.Item>
                        <Form.Item>
                            <Button type = "primary" htmlType = "submit" >
                                确认
                            </Button>
                        </Form.Item>
                    </Form>
                )


        )
    }
}
export default Partially_publish_Form;