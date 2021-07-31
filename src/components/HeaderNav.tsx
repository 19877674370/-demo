import React from "react";
import "./headerNav.scss";
import { withRouter } from "react-router-dom";
import nav_money from "../asset/index/nav_money.png";
import nav_car from "../asset/index/nav_car.png";
import nav_phone from "../asset/index/nav_phone.png";
import logo from "../asset/index/logo.png";
import instance from "../services/request"; // axios
import { DownOutlined } from "@ant-design/icons";
import loginPng from "../asset/login.png"
import userPng from "../asset/user.png"
import { Dropdown, Menu } from "antd";



class HeaderNav extends React.Component<any, any> {
 

  state = {
    info: "",
    isActive: 1,
  };

 
  // 路由跳转
  handleGo = (url: string, type?: number): any => {
    this.props.history.push(url);
    this.setState({
      isActive: type,
    });
  };

 
  // 周期函数 
  //go更新返回上一个页面
   //push更新跳转到指定一个页面
  componentDidMount() {
    this.getAllData();
    if (!this.props.location.query) {
      // this.props.history.go(-1);
      // this.props.history.push("/home/index");  
      return;
    }
  }

  
  // 初始化数据
  async getAllData() {
    let res = await instance.get("/oapi/index/Home_head");
    this.setState({
      info: res.data.exchange_rate.value,
    });
    localStorage.setItem("rate", JSON.stringify(res.data));
  }

  // 下拉列表
  handleDrop = (e: any): void => {
    e.preventDefault();
    this.props.history.push("/home/user");
  };

  // 注销
  handleOff = () => {
    localStorage.removeItem("userInfo");
   this.props.history.go()
    
  };

 
  menu = (
    <Menu>
      <Menu.Item>
        <span onClick={this.handleOff}>hủy</span>
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <div className="nav">
        <div className="nav-top">
          <div className="nav-lef">
            <div className="lef-money">
              <div className="money-icon">
                <img alt="" src={nav_money} />
              </div>
              <div className="money-num">{this.state.info}</div>
            </div>

            <div className="lef-phone">
              <div className="phone-icon">
                <img alt="" src={nav_phone} />
              </div>
              <div className="phone-num">0700-7709977</div>
            </div>
          </div>

          <div className="nav-rig">
            {localStorage.getItem("userInfo") ? (
              <div className="rig-menu">
                <Dropdown overlay={this.menu}>
                  
                  <span className="ant-dropdown-link" style={{color:'#fff'}} onClick={this.handleDrop}>
                  <img style={{width:25,height:25}} src={userPng} alt="" />
                    Trung tâm cá nhân
                    <DownOutlined />
                  </span>
                </Dropdown>
              </div>
            ) : (
              <div className="rig-menu" onClick={() => this.handleGo("/login")}>
                  <img style={{width:25,height:25}} src={loginPng} alt="" />
                Ký vô.
              </div>
            )}

            <div className="rig-menu">
              <div className="menu-icon">
                <img alt="" src={nav_car} />
              </div>
              <div className="menu-text"> Giỏ Hàng</div>
            </div>
          </div>
        </div>

        <div className="nav-bom">
          <div
            className="bom-logo"
            onClick={() => this.handleGo("/home/index")}
          >
            <img alt="" src={logo} />
          </div>

          <div className="bom-tab">
            <div
              className={`tab-box ${
                this.state.isActive === 1 ? "indexActive" : null
              }`}
              onClick={() => this.handleGo("/home/index", 1)}
            >
              TRANG CHỦ
            </div>
            <div
              className={`tab-box ${
                this.state.isActive === 2 ? "indexActive" : null
              }`}
              onClick={() => this.handleGo("/home/news", 2)}
            >
              {" "}
              GIỚI THIỆU
            </div>

            <div
              className={`tab-box ${
                this.state.isActive === 3 ? "indexActive" : null
              }`}
              onClick={() => this.handleGo("/home/help", 3)}
            >
              {" "}
              KINH NGHIỆM
            </div>
            <div
              className={`tab-box ${
                this.state.isActive === 4? "indexActive" : null
              }`}
              onClick={() => this.handleGo("/home/selfShop",4)}
            >
              Tự KINH DOANH
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderNav);
