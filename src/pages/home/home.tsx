import React from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderNav from "../../components/HeaderNav";
import GoodsDet from "../goods/goodsDet";
import GoodsList from "../goods/goodsList";
import Help from "../help/help";
import Index from "../index";
import News from "../news/news";
import NewsDetils from "../news/newsDetils";
import PlaceOrder from "../order/placeOrder";
import Self from "../selfShop/selfShop";
import User from "../user/user";
import Good from "../selfShop/goodsMsg"

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <HeaderNav></HeaderNav>
        <Switch>
          <Route path="/" exact component={Index}></Route>
          <Route path="/home/index" exact component={Index}></Route>
          <Route path="/home/news" component={News}></Route>
          <Route path="/home/newsDetils" component={NewsDetils}></Route>
          <Route path="/home/goodsList" component={GoodsList}></Route>
          <Route path="/home/goodsDet" component={GoodsDet}></Route>
          <Route path="/home/user" component={User}></Route>
          <Route path="/home/place" component={PlaceOrder}></Route>
          <Route path="/home/selfShop" component={Self}></Route>
          <Route path="/home/help" component={Help}></Route>
          <Route path="/home/good" component={Good}></Route>
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default Home;
