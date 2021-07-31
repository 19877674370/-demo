import React from "react";
import "./footer.scss";

import tin_logo from "../asset/index/tin_logo.png";
import twi from "../asset/index/soc_twi.png";
import face from "../asset/index/soc_face.png";
import weibo from "../asset/index/soc_weibo.png";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-top">
          <div className="top-lef">
            <div className="lef-top">
              <img src={tin_logo} alt="" />
            </div>
            <div className="lef-bom">
              <div className="bom-l">
                <img src={weibo} alt="" />
              </div>
              <div className="bom-l">
                <img src={twi} alt="" />
              </div>
              <div className="bom-l">
                <img src={face} alt="" />
              </div>
            </div>
          </div>

          <div className="top-rig">
            <div className="rig-box">
              <div className="rig-title">Giới thiệu</div>
              <div className="rig-t">Về Pugo</div>
              <div className="rig-th">Quy định và chính sách</div>
            </div>

            <div className="rig-box">
              <div className="rig-title">Giới thiệu</div>
              <div className="rig-t">Về Pugo</div>
              <div className="rig-th">Quy định và chính sách</div>
            </div>

            <div className="rig-box">
              <div className="rig-title">Giới thiệu</div>
              <div className="rig-t">Về Pugo</div>
              <div className="rig-th">Quy định và chính sách</div>
            </div>
          </div>
        </div>

        <div className="footer-bom">
          <div className="bom-o">
            199 Minh Khai, Hai Bà Trưng, Hà Nội 1900.633.49
          </div>
          <div className="bom-t">XXXXXX.vn</div>
        </div>
      </div>
    );
  }
}

export default Footer;
