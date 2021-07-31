import React from "react";
import "./user.scss";

import {
  Avatar,
  Cascader,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Table,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import instance from "../../services/request"; // axios
const { Option } = Select;

class User extends React.Component<any, any> {
  // 生命周期
  componentDidMount() {
    if (!this.state.userInfo) {
      this.props.history.push("/login");
      message.error("làm ơn đăng nhập");
      return;
    }

    this.getAllData();
  }

  // 初始化数据
  getAllData = async () => {
    let res: any = await instance.post("/oapi/User/GetUserSecurity", {
      uid: this.state.userInfo.id,
      token: this.state.userInfo.token,
    });

    // 银行列表
    let bankRes: any = await instance.post("/oapi/User/GetBank");

    // 充值记录
    let toUpRecord: any = await instance.post("/oapi/User/GetUserRecord", {
      uid: this.state.userInfo.id,
      token: this.state.userInfo.token,
    });

    // 地区列表
    let dqList: any = await instance.post("/oapi/User/GetCitySelect");

    this.setState({
      dqList: dqList.data,
      toUpRecord: toUpRecord.data,
      loginInfo: res.data,
      bankList: bankRes.data,
      addressList: res.data.address,
    });
  };

  state: any = {
    // 操作类型
    operType: 2, // 1我的包裹 2收货地址 3我的余额 4更改个人信息
    // 银行信息
    bankList: [],
    // 充值弹窗
    toUpShow: false,
    // 充值记录 弹窗
    recordShow: false,
    // 添加地址弹窗
    addressShow: false,
    // 充值备注
    toUpRemark: "",
    // 充值记录
    toUpRecord: {},
    // 充值数量
    toUpNum: 0,
    // 收货地址 table 数据
    addressList: [],
    // 充值 银行信息
    toUpBank: "",
    // 地区列表
    dqList: [],
    // 登录个人信息
    loginInfo: {},
    // 添加地址 详细地址
    addressVal: "",
    // 添加地址 姓名
    addressName: "",
    // 添加地址 电话
    addressMobile: "",
    // 添加地址 地区
    addressDq: [],
    // 用户信息
    userInfo: JSON.parse(localStorage.getItem("userInfo") as string),

    // 表格列参数
    tableColumns: [
      {
        title: "name",
        dataIndex: "name",
        key: "key",
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "key",
      },
      {
        title: "地址",
        dataIndex: "address",
        key: "key",
      },
      {
        title: "说明",
        dataIndex: "tags",
        key: "key",
      },
    ],

    // 表格数据
    tableData: [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: "nice",
      },
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: "nice",
      },
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: "nice",
      },
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: "nice",
      },
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: "nice",
      },
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: "nice",
      },
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: "nice",
      },
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: "nice",
      },
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: "nice",
      },
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: "nice",
      },
    ],
  };

  // 充值弹窗 确认
  handleToUp = async () => {
    let res: any = await instance.post("/oapi/User/SetRecord", {
      uid: this.state.userInfo.id,
      amount: this.state.toUpNum,
      bankor: this.state.toUpBank,
      remarks: this.state.toUpRemark,
    });
    message.success(res.msg);
    this.getAllData();
    this.setState({
      toUpShow: false,
    });
  };

  // 充值数量
  handleToNum = (v: number) => {
    this.setState({
      toUpNum: v,
    });
  };

  // 充值类型 银行卡。。。
  handleToSel = (v: any) => {
    this.setState({
      toUpBank: v,
    });
  };

  // 充值备注
  handleToReark = (v: any) => {
    this.setState({
      toUpRemark: v.target.value,
    });
  };

  // 删除地址
  handleDel = (v: any) => {
    Modal.confirm({
      title: "xóa hay không?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "yes",
      okType: "danger",
      cancelText: "no",
      onOk: () => {
        instance
          .post("/oapi/User/DetAddress", {
            uid: this.state.userInfo.id,
            token: this.state.userInfo.token,
            id: v.id,
          })
          .then((res: any) => {
            message.success(res.msg);
            this.getAllData();
          });
      },
    });
  };

  // 添加地址
  handleAdd = () => {
    instance
      .post("/oapi/User/SetAddress", {
        uid: this.state.userInfo.id,
        diqu: this.state.addressDq[0],
        city: this.state.addressDq[1],
        address: this.state.addressVal,
        sname: this.state.addressName,
        mobile: this.state.addressMobile,
      })
      .then((res: any) => {
        message.success(res.msg);
        this.getAllData();
        this.setState({
          addressShow: false,
        });
      });
  };

  // 选择地区
  handleSelDq = (v: any) => {
    this.setState({
      addressDq: v,
    });
  };

  // 充值记录 table
  recordColumns = [
    {
      title: "Số lượng",
      dataIndex: "amount",
    },
    {
      title: "tình trạng",
      dataIndex: "type",
      render: (v: number) => (v === 1 ? <span>直充</span> : <span>转账</span>),
    },
    {
      title: "Nạp tiền vào ngân hàng",
      dataIndex: "bankor",
    },
    {
      title: "nhận xét",
      dataIndex: "remarks",
    },
    {
      title: "Thời gian sạc lại",
      dataIndex: "create_time",
    },
    {
      title: "tình trạng",
      dataIndex: "status",
      render: (v: number) =>
        v === 1 ? <span>已到账</span> : <span>审核中</span>,
    },
  ];

  // 收货地址 table
  addressColumns = [
    {
      title: "Tên người nhận hàng",
      dataIndex: "sname",
    },
    {
      title: "Điện thoại người nhận hàng",
      dataIndex: "mobile",
    },
    {
      title: "Địa chỉ nhà",
      dataIndex: "address",
    },
    {
      title: "vận hành",
      dataIndex: "",
      render: (v: any) => (
        <div>
          {/* <span style={{color:'#0094ff',marginRight:10}}>添加</span> */}
          <span
            onClick={() => {
              this.handleDel(v);
            }}
            style={{ color: "#dd001b" }}
          >
            xóa bỏ
          </span>
        </div>
      ),
    },
  ];

  // 充值记录
  handleOperType = () => {
    if (this.state.operType === 1) {
      return (
        <div className="rig-take">
          <Table
            scroll={{ y: 350 }}
            columns={this.state.tableColumns}
            dataSource={this.state.tableData}
          />
        </div>
      );
    } else if (this.state.operType === 2) {
      return (
        <div className="rig-take">
          <div>
            <Table
              pagination={false}
              scroll={{ y: 350 }}
              columns={this.addressColumns}
              dataSource={this.state.addressList}
            />
          </div>
          <div className="take-add">
            <span
              onClick={() => {
                this.setState({
                  addressShow: true,
                });
              }}
            >
              Thêm vào
            </span>
          </div>

          <Modal
            title="Basic Modal"
            visible={this.state.addressShow}
            onOk={this.handleAdd}
            onCancel={() => {
              this.setState({
                addressShow: false,
              });
            }}
          >
            <div className="addressAdd">
              <div className="add-dq">
                <div className="dq-title">Khu vực</div>
                <div className="add-val">
                  <Cascader
                    options={this.state.dqList}
                    onChange={this.handleSelDq}
                    fieldNames={{
                      label: "vn_name",
                      value: "vn_name",
                      children: "level",
                    }}
                    placeholder="vui lòng chọn khu vực"
                  />
                </div>
              </div>

              <div className="add-dq">
                <div className="dq-title">Địa chỉ nhà</div>
                <div className="add-val">
                  <Input
                    value={this.state.addressVal}
                    onChange={(e: any) => {
                      this.setState({
                        addressVal: e.target.value,
                      });
                    }}
                    placeholder="Vui lòng nhập địa chỉ chi tiết"
                  />
                </div>
              </div>

              <div className="add-dq">
                <div className="dq-title">Tên người nhận hàng</div>
                <div className="add-val">
                  <Input
                    value={this.state.addressName}
                    onChange={(e: any) => {
                      this.setState({
                        addressName: e.target.value,
                      });
                    }}
                    placeholder="Vui lòng nhập địa chỉ chi tiết"
                  />
                </div>
              </div>

              <div className="add-dq">
                <div className="dq-title">Điện thoại người nhận hàng</div>
                <div className="add-val">
                  <Input
                    type="number"
                    value={this.state.addressMobile}
                    onChange={(e: any) => {
                      this.setState({
                        addressMobile: e.target.value,
                      });
                    }}
                    placeholder="Vui lòng nhập địa chỉ chi tiết"
                  />
                </div>
              </div>
            </div>
          </Modal>
        </div>
      );
    } else if (this.state.operType === 3) {
      return (
        <div className="rig-balance">
          <div
            className="balance-record"
            onClick={() => {
              this.setState({
                recordShow: true,
              });
            }}
          >
            Bản ghi nạp tiền
          </div>
          <div className="balance-top">
            Số dư tiền: VNC {this.state.loginInfo.balance}
          </div>
          <div
            className="balance-toup"
            onClick={() => {
              this.setState({
                toUpShow: true,
              });
            }}
          >
            <span>Bạn biết</span>
          </div>

          {/* 充值弹窗 */}
          <Modal
            title="Nạp điện"
            visible={this.state.toUpShow}
            onOk={this.handleToUp}
            okText="Phần còn"
            onCancel={() => {
              this.setState({
                toUpShow: false,
              });
            }}
          >
            <div className="toList">
              <div className="toList-num">
                <div className="num-title">VND:</div>
                <div className="num-val">
                  <InputNumber
                    style={{ width: "100%" }}
                    min={1}
                    max={9999}
                    defaultValue={0}
                    onChange={this.handleToNum}
                  />
                </div>
              </div>

              <div className="toList-bank">
                <div className="bank-title">Ngân hàng:</div>
                <div className="bank-val">
                  <Select
                    defaultValue=""
                    style={{ width: "100%" }}
                    onChange={this.handleToSel}
                  >
                    {this.state.bankList.map((item: any) => (
                      <Option key={item.id} value={item.id}>
                        {item.bank_name}
                        {item.name}({item.card})
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="toList-remark">
                <div className="remark-title">Mật khẩu ngân hàng:</div>
                <div className="remark-val">
                  <Input
                    value={this.state.toUpRemark}
                    onChange={this.handleToReark}
                    placeholder="Basic usage"
                  />
                </div>
              </div>
            </div>
          </Modal>

          {/* 充值记录弹窗 */}
          <Modal
            width={1000}
            title="Nạp điện"
            visible={this.state.recordShow}
            onOk={() => {
              this.setState({
                recordShow: false,
              });
            }}
            onCancel={() => {
              this.setState({
                recordShow: false,
              });
            }}
          >
            <div className="toList">
              <Table
                bordered={true}
                pagination={false}
                columns={this.recordColumns}
                dataSource={this.state.toUpRecord}
              />
            </div>
          </Modal>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="user">
        <div className="user-lef">
          <div className="lef-top">
            <div className="top-img">
              <Avatar src={this.state.loginInfo.haed} size={64} />
            </div>
            <div className="top-name">{this.state.loginInfo.name}</div>
          </div>

          <div className="lef-bom">
            <div className="bom-list">
              <div
                className={`list-cell ${
                  this.state.operType === 3 ? "isUserActive" : ""
                }`}
                onClick={() => {
                  this.setState({
                    operType: 3,
                  });
                }}
              >
                Số dư tiền
              </div>
              <div
                className={`list-cell ${
                  this.state.operType === 1 ? "isUserActive" : ""
                }`}
                onClick={() => {
                  this.setState({
                    operType: 1,
                  });
                }}
              >
                Đang chờ nhận
              </div>
              <div
                className={`list-cell ${
                  this.state.operType === 2 ? "isUserActive" : ""
                }`}
                onClick={() => {
                  this.setState({
                    operType: 2,
                  });
                }}
              >
                Thiết lập địa chỉ
              </div>
              <div
                className={`list-cell ${
                  this.state.operType === 4 ? "isUserActive" : ""
                }`}
                onClick={() => {
                  this.setState({
                    operType: 4,
                  });
                }}
              >
                Thay đổi mật khẩu
              </div>
            </div>
          </div>
        </div>

        <div className="user-rig">
          {/* 收货 */}
          {this.handleOperType()}
        </div>
      </div>
    );
  }
}

export default User;
