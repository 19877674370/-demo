import React from "react";
import "./goods.scss";
import search_tb from "../../asset/index/search_tb.png";
import bb from "../../asset/index/1688.png";
import instance from "../../services/request"; // axios
import { Select, Input, Image, Pagination, Spin } from "antd";
// import { FC } from "react";
const { Search } = Input;
const { Option } = Select;

class GoodsList extends React.Component<any, any> {
  state = {
    searchVal: "",
    goodsList: JSON.parse(localStorage.getItem("searchVal") as string).items
      .item,

    goodsDet: JSON.parse(localStorage.getItem("searchVal") as string),
    isLoading: false,

    type: localStorage.getItem("searchType"),
    logo: localStorage.getItem("searchType") === "taobao" ? search_tb : bb,
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);
  }

  // 切换 购物平台
  handleChange = (value: string): void => {
    let logo: string = "";
    if (value === "taobao") {
      logo = search_tb;
    } else if (value === "1688") {
      logo = bb;
    }
    this.setState({
      type: value,
      logo,
    });
  };

  handlePage(page: Number, pageSize: Number | undefined): void {
    console.log(page, pageSize);
  }

  // 搜索
  handleSearch = async () => {
    let res: any = await instance.post("/oapi/Wangbang/GetSearch", {
      type: this.state.type,
      q: this.state.searchVal,
    });

    this.setState({
      goodsList: res.items.item,
    });
    localStorage.setItem("searchVal", JSON.stringify(res));
    localStorage.setItem("searchType", this.state.type as string);
  };

  // 查看商品详情
  handleGoodsDet = (v: any): void => {
    this.props.history.push({
      pathname: "/home/goodsDet",
      query: {
        goodsId: v.num_iid,
        type: this.state.goodsDet.api_type,
      },
    });
  };

  render() {
    return (
      <Spin tip="Loading..." spinning={this.state.isLoading}>
        <div className="goodsList">
          {/* 搜索框 */}
          <div className="list-search">
            <div className="index-search">
              <div className="search-lef">
                <div className="lef-icon">
                  <img src={this.state.logo} width={40} height={30} alt="" />
                </div>

                <div className="lef-down">
                  <Select
                    defaultValue={this.state.type || '0'}
                    // bordered={false}
                    style={{ width: 207 }}
                    onChange={this.handleChange}
                  >
                    <Option value="taobao">淘宝</Option>
                    <Option value="1688">1688</Option>
                  </Select>
                </div>
              </div>

              <div className="search-rig">
                <Search
                  value={this.state.searchVal}
                  placeholder="请输入搜索内容"
                  style={{ width: 633 }}
                  onSearch={this.handleSearch}
                  onChange={(v) => this.setState({ searchVal: v.target.value })}
                />
              </div>
            </div>
          </div>

          {/* 商品列表 */}
          <div className="list-good">
            <div className="good-list">
              {this.state.goodsList.map((item: any) => (
                <div
                  className="list-box"
                  onClick={() => this.handleGoodsDet(item)}
                  key={item.num_iid}
                >
                  <div className="box-img">
                    <Image
                      preview={false}
                      width={240}
                      height={240}
                      src={item.pic_url}
                    />
                  </div>
                  <div className="box-title">{item.title}</div>
                  <div className="box-price">
                    <span className="price-lef">VND</span>
                    <span className="price-rig">
                      {item.price *
                        JSON.parse(localStorage.getItem("rate") as string)
                          .exchange_rate.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 翻页 */}
          <div className="list-page">
            <Pagination
              showSizeChanger={false}
              pageSize={20}
              onChange={this.handlePage}
              defaultCurrent={1}
              total={this.state.goodsDet.items.total_results}
            />
          </div>
        </div>
      </Spin>
    );
  }
}

export default GoodsList;
