import React from "react";
import "./index.scss";

import search_tb from "../../asset/index/search_tb.png";
import bb from "../../asset/index/1688.png";
import flow_one from "../../asset/index/flow_one.png";
// import flow_two from '../../asset/index/flow_two.png'
// import flow_three from '../../asset/index/flow_three.png'
// import flow_four from '../../asset/index/flow_four.png'
// import flow_five from '../../asset/index/flow_five.png'
import flow_jt from "../../asset/index/flow_jt.png";
import sw_lj from "../../asset/index/sw_lj.png";
import sw_rj from "../../asset/index/sw_rj.png";
// import tin_two from "../../asset/index/tin_two.png";
import tin_three from "../../asset/index/tin_three.png";
// import goods_l from "../../asset/index/goods_l.png";
import { Select, Input, Carousel } from "antd";
import instance from "../../services/request"; // axios
// import { readBuilderProgram } from "typescript";
const { Search } = Input;
const { Option } = Select;

class Index extends React.Component<any, any> {
  swipersRef: any;

  // 周期函数
  componentDidMount() {
    this.getAllData();
  }

  // 切换 购物平台
  handleChange = (value: string): void => {
    let logo:string = ''
    if(value === 'taobao'){
      logo = search_tb
    }else if(value === '1688'){
      logo = bb
    }
    this.setState({
      type:value,
      logo
    })
  };

  state: any = {
    searchVal: "",
    seckillData: [], // 秒杀数据
    recData: [], // 推荐数据
    type:'taobao',
    logo:search_tb
  };

  // 搜索
  handleSearch = async () => {
    let res = await instance.post("/oapi/Wangbang/GetSearch", {
      type: this.state.type,
      q: this.state.searchVal,
    });

    localStorage.setItem("searchVal", JSON.stringify(res));
    localStorage.setItem("searchType", this.state.type);
    this.props.history.push("/home/goodsList");
  };

  // 初始化数据
  getAllData = async () => {
    // 秒杀数据
    let seckillDatas: any = await instance.get("/oapi/index/GetSeckill");
    // 推荐商品
    let recDatas: any = await instance.get("/oapi/index/GetRecommend");

    this.setState({
      seckillData: seckillDatas.data,
      recData: recDatas.data,
    });
  };

  // 秒杀 左右翻页
  handlePrev = () => {
    this.swipersRef.prev();
  };

  handleNext = () => {
    this.swipersRef.next();
  };

  render() {
    return (
      // 搜索
      <div className="div_index">
        <div className="index">
          <div className="index-state">
            <div className="state-one">Nhập hàng Trung</div>
            <div className="state-two"> Quốc tận gốc - Uy tín</div>
            <div className="state-three">
              - Thời gian vận chuyển hàng hóa nhanh nhất (2-5 ngày)
            </div>
            <div className="state-four">
              {" "}
              - Đặt hàng trong vòng 24 giờ kể từ khi nhận được đặt cọc
            </div>
          </div>

          <div className="index-search">
            <div className="search-lef">
              <div className="lef-icon">
                <img width={40} height={30} alt="" src={this.state.logo} />
              </div>

              <div className="lef-down">
                <Select
                  defaultValue="taobao"
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

        {/* 购买顺序 */}
        <div className="index-flow">
          <div className="flow-cell">
            <div className="cell-img">
              <img alt="" src={flow_one} />
            </div>
            <div className="cell-text">
              <div className="text-top">Chọn hàng tại các</div>
              <div className="text-bom">website Trung Quốc</div>
            </div>
          </div>

          <div className="flow-jt">
            <img alt="" src={flow_jt} />
          </div>

          <div className="flow-cell">
            <div className="cell-img">
              <img alt="" src={flow_one} />
            </div>
            <div className="cell-text">
              <div className="text-top">Chọn hàng tại các</div>
              <div className="text-bom">website Trung Quốc</div>
            </div>
          </div>

          <div className="flow-jt">
            <img alt="" src={flow_jt} />
          </div>

          <div className="flow-cell">
            <div className="cell-img">
              <img alt="" src={flow_one} />
            </div>
            <div className="cell-text">
              <div className="text-top">Chọn hàng tại các</div>
              <div className="text-bom">website Trung Quốc</div>
            </div>
          </div>

          <div className="flow-jt">
            <img alt="" src={flow_jt} />
          </div>

          <div className="flow-cell">
            <div className="cell-img">
              <img alt="" src={flow_one} />
            </div>
            <div className="cell-text">
              <div className="text-top">Chọn hàng tại các</div>
              <div className="text-bom">website Trung Quốc</div>
            </div>
          </div>

          <div className="flow-jt">
            <img alt="" src={flow_jt} />
          </div>

          <div className="flow-cell">
            <div className="cell-img">
              <img alt="" src={flow_one} />
            </div>
            <div className="cell-text">
              <div className="text-top">Chọn hàng tại các</div>
              <div className="text-bom">website Trung Quốc</div>
            </div>
          </div>
        </div>

        {/* 秒杀 */}
        <div className="index-navList">
          <div className="navList-title">Thứ hai giết hàng hóa</div>
          <div className="navList-sw">
            <div className="sw-list">
              {/* <div className="oper-lef" onClick={this.handlePrev}>
                <img src={sw_lj} alt="" />
              </div> */}
              <Carousel
                autoplay
                ref={(dom) => {
                  this.swipersRef = dom;
                }}
              >
                {this.state.seckillData.map((item: any, index: any) => (
                  <div className="list-cells" key={index}>
                    {item.map((it: any, ix: any) => (
                      <div className="cell-boxs" key={ix}>
                        <img src={it.imges} alt="" />
                      </div>
                    ))}
                  </div>
                ))}
              </Carousel>
              {/* <div className="oper-rig" onClick={this.handleNext}>
                <img src={sw_rj} alt="" />
              </div> */}
            </div>
          </div>
        </div>

        {/* 产品列表 */}
        <div className="index-goods">
          <div className="goods-title">BÁN HàNG HóA CủA Họ</div>
          <div className="sw-list">
            <div className="oper-lef" onClick={this.handlePrev}>
              <img src={sw_lj} alt="" />
            </div>
            <Carousel
              autoplay
              ref={(dom) => {
                this.swipersRef = dom;
              }}
            >
              {this.state.recData.map((item: any, index: any) => (
                <div className="list-cells" key={index}>
                  {item.map((it: any, ix: any) => (
                    <div className="cell-boxs" key={ix}>
                      <img src={it.imges} alt="" />
                    </div>
                  ))}
                </div>
              ))}
            </Carousel>
            <div className="oper-rig" onClick={this.handleNext}>
              <img src={sw_rj} alt="" />
            </div>
          </div>
        </div>

        {/* 库存 */}
        <div className="index-tin">
          <div className="tin-title">TIN MỚI NHẤT</div>
          <div className="tin-list">
            <div className="list-cell">
              <div className="cell-img">
                <img alt="" width={340} height={340} src={tin_three} />
              </div>
              <div className="cell-text">Trang web nào được hỗ trợ</div>
              <div className="cell-btn">Nhiều hơn</div>
            </div>

            <div className="list-cell">
              <div className="cell-img">
                <img alt="" width={340} height={340} src={tin_three} />
              </div>
              <div className="cell-text">Trang web nào được hỗ trợ</div>
              <div className="cell-btn">Nhiều hơn</div>
            </div>

            <div className="list-cell">
              <div className="cell-img">
                <img alt="" width={340} height={340} src={tin_three} />
              </div>
              <div className="cell-text">Trang web nào được hỗ trợ</div>
              <div className="cell-btn">Nhiều hơn</div>
            </div>
          </div>
        </div>

        {/* 统计 */}
        <div className="index-sta">
          <div className="sta-title">TIN MỚI NHẤT</div>
          <div className="sta-list">
            <div className="list-box">
              <div className="box-num">1920</div>
              <div className="list-text">TỔNG SỐ KHÁCH HÀNG</div>
            </div>

            <div className="list-box">
              <div className="box-num">1920</div>
              <div className="list-text">TỔNG SỐ KHÁCH HÀNG</div>
            </div>

            <div className="list-box">
              <div className="box-num">1920</div>
              <div className="list-text">TỔNG SỐ KHÁCH HÀNG</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
