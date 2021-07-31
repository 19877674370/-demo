import {
  Image,
  Rate,
  InputNumber,
  Button,
  Carousel,
  message,
  Spin,
} from "antd";
import React from "react";
import "./goods.scss";

import instance from "../../services/request"; // axios
import html2canvas from "html2canvas";

interface GoodsProps {
  type: "";
  goodsId: "";
}

class GoodsDet extends React.Component<any, any> {
  state: any = {
    goodsData: "",
    propsData: "",
    desc: "",
    locaData: JSON.parse(localStorage.getItem("rate") as string),
    classFiy: [], // 类型分类
    selAry: {}, // 属性选中
    printImg: "", // 截图
    goodsNum: 0, // 购买数量
    isSel: false, // 是否选中
    isLoading:false // 是否记载中...
  };

  scrolls = 0;

  componentDidMount() {
    if (!this.props.location.query) {
      this.props.history.go(-1);
      return;
    }
    this.getAllData(this.props.location.query);
  }

  //   初始化数据
  getAllData = async (v: GoodsProps) => {
    try {
      this.setState({
        isLoading:true
      })
      let res: any = await instance.post(
        "/oapi/Wangbang/item_get?type=" + v.type + "&num_iid=" + v.goodsId
      );
      this.setState({
        isLoading:false,
        goodsData: res,
        desc: res.item.desc,
        classFiy: res.item.skus.sku,
  
        imgs: res.item.item_imgs,
        ...res,
      });
    }catch{
      this.setState({
        isLoading:false
      })
    }
    
  };

  //  数量叠加商品
  handleAddNum = (v: number) => {
    this.setState({
      goodsNum: v,
    });
  };

  // 选中商品
  handleSelClass = (v: any): void => {
    this.setState({
      selAry: v,
      isSel: true,
    });

    let capture: any = document.querySelector("#capture");

    this.scrolls =
      document.documentElement.scrollTop || document.body.scrollTop;

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    let options = {
      allowTaint: true, //允许污染
      // taintTest: true, //在渲染前测试图片(没整明白有啥用)
      useCORS: true, //使用跨域(当allowTaint为true时这段代码没什么用)
      width: window.screen.availWidth,
      height: window.screen.availHeight,
      // windowWidth:document.body.scrollWidth,
      // windowHeight:document.body.scrollHeight,
      // x:0,
      y: this.scrolls,
    };

    //调用setTimeout(()=>{},settime)函数
    setTimeout(() => {
      html2canvas(capture, options).then((canvas) => {
        this.setState({
          printImg: canvas.toDataURL(),
        });
      });
    }, 10);

    document.body.scrollTop = this.scrolls;
    document.documentElement.scrollTop = this.scrolls;
  };

  //提交订单出现登录错误，然后延迟跳转登录页面
  handleSub = () => {
    if (!localStorage.getItem("userInfo")) {
      message.error("Xin vui lòng đăng nhập!");
      setTimeout(() => {
        this.props.history.push("/login");
      }, 1000);
      return;
    }
  

    instance
      .post("/oapi/Daigo/PurchaseDg", {
        user_id: JSON.parse(localStorage.getItem("userInfo") as string).id,
        num: this.state.goodsNum,
        d_price: this.state.selAry.price,
        address: "北京朝阳区王府井大街44号",
        commodity_type: this.state.api_type === "taobao" ? 2 : 3,
        commodity_img: this.state.selAry.sku_url,
        commodity_name: this.state.item.title,
        commodity_link: this.state.item.detail_url,
        attr_name: this.state.selAry.properties_names,
        attr_img: this.state.printImg,
      })
      .then((res: any) => {
        message.success(res.msg);
        this.props.history.push("/home/place");
      });
  };

  render() {
    let { item } = this.state;
    let { selAry } = this.state;
    return (
      <Spin tip="Loading..." spinning={this.state.isLoading}>
        <div className="det">
          {/* 商品属性 */}
          <div className="det-ams">
            <div className="ams-lef">
              {this.state.isSel ? (
                <div>
                  <Image
                    width={298}
                    height={298}
                    preview={false}
                    className="lef-img"
                    src={selAry.sku_url}
                  />
                </div>
              ) : (
                <Carousel autoplay>
                  {item
                    ? this.state.item.item_imgs.map(
                        (it: any, index: number) => (
                          <div key={index}>
                            <Image
                              preview={false}
                              className="lef-img"
                              src={it.url}
                            />
                          </div>
                        )
                      )
                    : " "}
                </Carousel>
              )}
            </div>

            <div className="ams-rig">
              <div className="rig-title">{item ? item.title : " "}</div>
              <div className="rig-price">
                VND{" "}
                {selAry
                  ? selAry.price * this.state.locaData.exchange_rate.value
                  : item.price * this.state.locaData.exchange_rate.value}
              </div>
              <div className="rig-ref">
                Giày thể thao chạy giày dép mùa hè 2021 mới nhẹ nhàng giảm chấn
                động mạng bề mặt phần mềm chạy giày dép giày dép
              </div>
              <div className="rig-rate">
                <Rate defaultValue={4.5} />
              </div>

              <div className="rig-size">
                <div className="size-list" id="capture">
                  {this.state.classFiy.map((it: any, ix: any) => (
                    <div
                      className={`size-box ${
                        this.state.selAry.sku_id === it.sku_id
                          ? "isActive"
                          : null
                      }`}
                      onClick={() => {
                        this.handleSelClass(it);
                      }}
                      key={ix}
                    >
                      {it.properties_names}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rig-num">
                <div className="num-lef">
                  <InputNumber
                    min={1}
                    max={99}
                    defaultValue={1}
                    onChange={this.handleAddNum}
                  ></InputNumber>
                </div>

                <div className="num-rig">
                  <Button type="primary" danger onClick={this.handleSub}>
                    mua
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 商品介绍 */}
          <div className="det-dec">
            <div className="dec-title">Chi tiết sản phẩm</div>
            <div
              className="dec-ss"
              dangerouslySetInnerHTML={{ __html: this.state.desc }}
            ></div>
          </div>
        </div>
      </Spin>
    );
  }
}

export default GoodsDet;
// function item(item: any, arg1: {}) {
//   throw new Error("Function not implemented.");
// }
