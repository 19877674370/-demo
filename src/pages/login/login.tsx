import { Button, Input, message } from "antd";
import React from "react";
import "./login.scss";

import instance from "../../services/request"; // axios

class Login extends React.Component<any,any> {
  state = {
    account: "",
    pws: "",
  };

  // 账号赋值
  handleAccount = (v: any) => {
    this.setState({
      account: v.target.value,
    });
  };

  // 密码赋值
  handlePws = (v: any) => {
    this.setState({
      pws: v.target.value,
    });
  };

  //   登录
  handleLogin = () => {
    instance.post("/oapi/User/login", {
      mobile: this.state.account,
      password: this.state.pws,
    }).then((res:any) =>{
        message.info(res.msg )
        localStorage.setItem('userInfo',JSON.stringify(res.data))
       this.props.history.push('/')
    })
  };

  render() {
    return (
      <div className="login">
        <div className="login-center">
          <div className="login-title">Đăng Nhập</div>
          <div className="login-inp">
            <div className="inp-account">
              <div className="account-title">Tài khoản </div>
              <div className="account-in">
                <Input placeholder="Account" onChange={this.handleAccount} />
              </div>
            </div>

            <div className="inp-account">
              <div className="account-title">Nhập mật khẩu</div>
              <div className="account-in">
                <Input placeholder="Password" onChange={this.handlePws} />
              </div>
            </div>
          </div>

          <div className="login-sub">
            <div className="sub-btn">
              <Button
                style={{ width: "100%" }}
                onClick={this.handleLogin}
                type="primary"
              >
                Primary Button
              </Button>
            </div>
            <div className="sub-text"> Không có tài khoản</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
