import { Menu, Pagination } from "antd";
import React from "react";
import "./self.scss";
import instance from "../../services/request"; // axios

import SubMenu from "antd/lib/menu/SubMenu";

class Self extends React.Component {
  // 生命周期
  componentDidMount() {
    this.getAllData();
  }

  state: any = {
    classList: [], // 分类列表
    goodsList: [], // 商品列表
  };

  //   初始化数据
  getAllData = async () => {
    //   分类
    let classList: any = await instance.post("/oapi/Selfshop/GetCommodityType");

    // 商品列表
    let goodsList: any = await instance.post("/oapi/Selfshop/GetSelfShop");

    this.setState({
      classList: classList.data,
      goodsList: goodsList.data,
    });
  };

  // 选择 分类 拿到所有分裂id
  handleSelAllClass = (v: any) => {
    console.log(v);
  };

  // 选择 一级 分类
  handleSelClass = (v: any) => {
    console.log(v);
  };

  render() {
    return (
      <div className="self">
        {/* 左侧导航 */}
        <div className="self-nav">
          <div className="nav-list">
            <Menu
              onClick={this.handleSelAllClass}
              style={{ width: 256 }}
              mode="vertical"
            >
              {this.state.classList.map((item: any) => (
                <SubMenu
                  onTitleClick={() => {
                    this.handleSelClass(item);
                  }}
                  key={item.id}
                  title={item.name}
                >
                  {item.level.map((it: any) => (
                    <Menu.Item key={it.id}>{it.name}</Menu.Item>
                  ))}
                </SubMenu>
              ))}
            </Menu>
          </div>
        </div>

        {/* 商品列表 */}
        <div className="self-goods">
          <div className="goods-list">
            {this.state.goodsList.map((item: any) => (
              <div className="goods-box">
                <div className="box-img">
                  <img className="img" src={item.imges} alt="" />
                </div>
                <div className="box-info">
                  {item.is_spike === 1 ? (
                    <div className="box-price">Seckill...</div>
                  ) : (
                    ""
                  )}
                  <div className="box-title">{item.nick}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 分页 */}
          <div className="self-page">
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    );
  }
}

export default Self;
