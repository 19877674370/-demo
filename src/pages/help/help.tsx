import React from "react";
import "./help.scss";
import instance from "../../services/request"; // axios

class Help extends React.Component {
    state: any = {
        newsList: [],
        isNewsSel: "",
        selNews: {},
      };
    
      // 生命周期
      componentDidMount() {
        this.getAllData();
      }
    
      // 初始化数据
      getAllData = async () => {
        // 新闻列表
        let newsList: any = await instance.get("/oapi/index/help_list");
        this.setState({
          newsList: newsList.data,
          isNewsSel:newsList.data[0].id,
          selNews:newsList.data[0]
        });
      };
    
      // 选中新闻
      handleSelNews = (v: any) => {
        console.log(v);
        this.setState({
          isNewsSel: v.id,
          selNews: v,
        });
      };
    
      render() {
        return (
          <div className="news">
            {/* 新闻导航 */}
            <div className="news-nav">
              <div className="nav-title">mục lục</div>
              <div className="nav-list">
                {this.state.newsList.map((item: any) => (
                  <div
                    key={item.id}
                    className={`list-cell ${
                      this.state.isNewsSel === item.id ? "isNewsSel" : null
                    }`}
                    onClick={() => {
                      this.handleSelNews(item);
                    }}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
    
            {/* 新闻列表 */}
            <div className="news-cont">
              <div className="cont-title">Tin tức</div>
              <div
                className="cont-list"
                dangerouslySetInnerHTML={{ __html: this.state.selNews.content }}
              ></div>
            </div>
          </div>
        );
      }
}

export default Help