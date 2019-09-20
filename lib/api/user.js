"use strict";

/** 
 * 用户API
*/
let userMixin = {
    /**
     * 创建用户
     */
    createUser(data, options) {
        const url = `/${this.apiVersion}/user/create`;
        return this.request("POST", url, null, data, options);
    },
    /**
     * 给用户添加属性值
     */
    createUserAttribute(data, options) {
        const url = `/${this.apiVersion}/user/user-attribute/create`;
        return this.request("POST", url, null, data, options);
    },
    /**
     * 获取用户属性列表
     */
    listUserAttribute(data, options) {
        const url = `/${this.apiVersion}/user-attribute/list`;
        return this.request("POST", url, null, data, options);
    }
};

module.exports = userMixin;