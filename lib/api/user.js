"use strict";
const SdkBase = require("../core/sdkBase");

class User extends SdkBase {
    /**
     * 创建用户
     */
    createUser(body, options) {
        const url = `/${this.apiVersion}/user/create`;
        return this.request("POST", url, null, body, options);
    }
    /**
     * 给用户添加属性值
     */
    createUserAttribute(body, options) {
        const url = `/${this.apiVersion}/user/user-attribute/create`;
        return this.request("POST", url, null, body, options);
    }
    /**
     * 获取用户属性列表
     */
    listUserAttribute(body, options) {
        const url = `/${this.apiVersion}/user-attribute/list`;
        return this.request("POST", url, null, body, options);
    }
}


module.exports = User;