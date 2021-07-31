import React from "react";
import { Route } from "react-router-dom";
import Index from "../pages/index/index";
import News from "../pages/news/news";

class Content extends React.Component {
  render() {
    return (
      <div className="content">
        {/* <Route path="/index" component={Index}></Route>
        <Route path="/news" component={News}></Route>
        <Route path="/" exact component={Index}></Route> */}
      </div>
    );
  }
}

export default Content;
