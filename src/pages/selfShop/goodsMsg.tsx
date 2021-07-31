import React from "react"

class goodsMsg extends React.Component{
    render(){
        return(
            //商品详情页
            <div className="indexShow"  style={{width:"1200px",height:"900px" ,border:"1px solid black",margin:"10px auto",position:"relative"}}>
                 <div className="goodsHead" style={{width:"100%",height:"50%",backgroundColor:"pink",position:"absolute"}}>
                     <div className="goodImg" style={{width:"35%",height:"96%",border:"black solid 1px",float:"left",marginLeft:"5px",marginTop:"5px"}}></div>
                     <div className="goodContent" style={{width:"64%",height:"96%",border:"red solid 1px",float:"left",marginLeft:"5px",marginTop:"5px"}}></div>
                 </div>
                 <div style={{width:"250px",height:"35px",border:"red solid 1px",position:"absolute",top:"52%",lineHeight:"35px",marginLeft:"5px"}}>
                     <span>我是分割标题</span>
                 </div>
                 <div className="goodsFoot" style={{width:"100%",height:"42%",backgroundColor:"yellow",position:"absolute",bottom:'5px'}}>
                 <div className="goodImg1" style={{width:"35%",height:"96%",border:"black solid 1px",float:"left",marginLeft:"5px",marginTop:"5px"}}></div>
                     <div className="goodContent2" style={{width:"64%",height:"96%",border:"red solid 1px",float:"left",marginLeft:"5px",marginTop:"5px"}}></div>
                 </div>
            </div>
        )
    }
}

export default goodsMsg