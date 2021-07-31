import { Button, message, Select, Table } from "antd";
import React from "react";
import "./order.scss";
import instance from "../../services/request";
const { Option } = Select;

class PlaceOrder extends React.Component<any, any> {
  state = {
    dataSource: [],
    datas: {},
   attr_name:"",
   attr_img:null,
   commodity_img:null,
   commodity_link:"",
   commodity_name:"",
   commodity_type:"",
   num:"",
   user_id:"",
   d_price:"",
   tableData:[]
  };
  tableData: any;

 
//全局刷新初始化
  componentDidMount() {
    if (!this.props.location.query) {
      // this.props.history.go(-1);  跳转
      return;
    }
    let dataSource: object[] = [];
    dataSource.push(this.props.location.query.attr);
    this.setState({
      datas: this.props.location.query.attr,
      dataSource:dataSource,
    });
  }

//订单的post请求  
//取出字段渲染table
  postAlldata =() =>{
    alert("正在post请求")
    instance
    .post("/oapi/Daigo/PurchaseDg",{
     num:this.state.num,
     attr_name:this.state.attr_name,
     commodity_name:this.state.commodity_name,
     user_id:this.state.user_id,
     d_price:this.state.d_price,
     commodity_type:this.state.commodity_type,
     commodity_img:this.state.commodity_img,
     commodity_link: this.state.commodity_link
    })
    .then((res:any) =>{
      console.log(res)
      message.success(res.msg);
       alert("post成功！")
    })
    .catch((error)=>{
      console.log(error.msg)
    })
  }

  //   地址下拉
  handleChange = (v: any): void => {
    console.log(v);
  };

  render() {
    console.log(this.state.dataSource);
    
    const columns = [
      {
        title: "图片",
        dataIndex: "commodity_img",
        key: "id",
        render: (record: string) => <img alt="" width="150" height="150" src={record} />,
      },
      {
        title: "属性",
        dataIndex: "attr_name",
        key: "id",
      },
      {
        title: "件数",
        dataIndex: "num",
        key: "id",
      },
      {
        title: "名称",
        dataIndex: "commodity_name",
        key: "id",
      },
    ];
    this.tableData=[
       {
        attr_name:"jkkk",
        commodity_img:null,
        commodity_name:"fwf",
        num:0 
       },
     ]
    return (
      <div className="place">
        <div className="place-head">
          <div className="head-top">XiaChan</div>
          <button type="button" onClick={this.postAlldata}> post</button>
          <div className="head-bom">Trang chủ &gt; Giỏ Hàng &gt; XiaChan</div>
        </div>

        <div className="place-goods">
          <div className="goods-list">
            <div className="list-title">Mua ở trang web này</div>
            <div className="list-tb">
              <Table
                dataSource={this.state.tableData}
                columns={columns}
                pagination={false}
                bordered
                rowKey={"id"}
              />
             
            </div>
          </div>
        </div>

        {/* 选择地址 */}
        <div className="place-assress">
          <Select
            defaultValue="taobao"
            // bordered={false}
            style={{ width: "60%" }}
            onChange={this.handleChange}
          >
            <Option value="taobao">淘宝</Option>
            <Option value="1688">1688</Option>
          </Select>
        </div>

        {/* 商品价格 */}
        <div className="place-price">
          <div className="price-title">Trả tiền</div>
          <div className="price-cell">
            <div className="cell-lef">Kế hoạch nhỏ :</div>
            <div className="cell-rig">VND:5000</div>
          </div>
          <div className="price-cell">
            <div className="cell-lef">Chưa kể:</div>
            <div className="cell-rig">VND:5000</div>
          </div>
          <div className="price-cell">
            <div className="cell-lef">Cộng lại:</div>
            <div className="cell-rig">VND:5000</div>
          </div>
        </div>

        {/* 提交 */}
        <div className="place-btn">
          <Button style={{ width: "50%", height: 60 }} type="primary">
            Để giải quyết
          </Button>
        </div>
      </div>
    );
  }
}

export default PlaceOrder;
