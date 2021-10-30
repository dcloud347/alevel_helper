import React from 'react';
import './App.less';
import Header from './Component/Header'
import Footer from "./Component/Footer";

class Forget_password extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div style={{marginTop:"5%",marginBottom:document.body.clientWidth>750?"13%":"40%",textAlign:"center"}}>
                    <h1>
                        请联系管理员更改密码
                    </h1>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        )
    }
}


export default Forget_password;
