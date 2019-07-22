import axios from "axios";
import { Message } from 'element-ui';
import qs from "qs";
const errorCodeMessage = {
    1000: "未知错误",
    1001: "用户未登录",
    1002: "权限错误",
    1003: "签名错误",
    1004: "对象不存在",
    1005: "业务逻辑错误",
    1006: "超出操作次数限制",
    1007: "操作过于频繁",
    1008: "网络错误",
    1009: "数据库执行错误",
    1010: "参数错误"
};
axios.defaults.withCredentials=true;
axios.interceptors.request.use((config) => {
    const method = config.method.toUpperCase();
    if (method === "POST" || method === "PUT") {
        if (!config.headers || config.headers["Content-Type"] !== "application/form-data") {
            config.data = qs.stringify(config.data);
            config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
    }else if (method === "GET") {
        config.params = config.data;
        delete config.data;
    }
    config.baseURL = "http://clinic.designchn.com";
    return config;
});
axios.interceptors.response.use((res) => {
    // 对响应数据做点什么
    if (res.data.code === 0) {
        return res.data;
    } else {
        const code = res.data.code;
        if (res.data.message) {
            Message.warning(res.data.message);
        } else if (errorCodeMessage[code]) {
            Message.warning(errorCodeMessage[code]);
            if (code === 1001) {
                location.replace("/login");
            }
        }else {
            Message.warning("未知错误");
        }
    }
}, (error) => {
    // 对响应错误做点什么
    console.log(error);
    Message.warning(JSON.stringify(error));
});
function xhr(config) {
    return axios(config);
}
export default xhr;
