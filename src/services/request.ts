/*
 * @Author: yayxs
 * @Date: 2020-09-03 20:05:50
 * @LastEditTime: 2020-09-05 17:37:34
 * @LastEditors: yayxs
 * @Description:
 * @FilePath: \NeteaseCloudMusic\src\services\request.js
 * @
 */
// 引入axios
import axios from "axios";
import { message } from "antd";
// import { Router } from "react-router-dom";
// import * as commonConfig from "../common/config";

// import React from "react";

const instance = axios.create({
  baseURL: "http://119.29.160.158",
  timeout: 50000,
});

// Add a request interceptor
//  全局请求拦截，发送请求之前执行
instance.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    // 设置请求的 token 等等
    // config.headers["authorization"] = "Bearer " + getToken();
    return config;
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
//  请求返回之后执行
instance.interceptors.response.use(
  function (response: any) {
    if (response.data.code === 200) {
      return response.data;
    }else if(response.data.error_code === '0000'){
      return response.data;
    } else {
      message.error(response.data.msg);
      return Promise.reject(response.data);
    }
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
