import Promise from 'bluebird';
import jquery from 'jquery';
import _ from 'lodash';
import NP from 'number-precision';

import systemConfig from '../config/config';
import Vue from 'vue';
import FormatUtil from './format-util';
import CookieUtil from './cookie-util';

var $ = jquery.noConflict();

let util = {};
util = _.assign(util, FormatUtil);
util = _.assign(util, CookieUtil);
var token = '';
util.model_key = 'model';
util.user_key = "user";
util.token_key = 'token';
util.serverUrl ="http://192.168.243.1:8087";
util.invokeServer = function (ajaxConfig,serverUrl) {
    let self = this;
    var reqConfig = {};
    for (var key in ajaxConfig) {
        if (ajaxConfig.hasOwnProperty(key)) {
            reqConfig[key] = ajaxConfig[key];
        }
    }
    if(serverUrl){
        reqConfig.url = serverUrl + ajaxConfig.path;
    }else{
        reqConfig.url = util.serverUrl + ajaxConfig.path;
    }

    var params = ajaxConfig.params || {};
    var queryStrs = [];
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            var element = params[key];
            queryStrs.push(key + '=' + element);
        }
    }
    var str = queryStrs.join('&');
    if (str) {
        reqConfig.url = reqConfig.url + '?' + str;
    }

    return new Promise((resolve, reject) => {
        reqConfig.success = (data, textStatus, response) => {
            if(data == "" || data.code == 200 || data.code == 0 ){
                resolve(data, textStatus, response);
            }else{
                reject(data, textStatus, response);
            }
            return;
        };
        reqConfig.error = (XMLHttpRequest, textStatus, errorThrown) => {
            reject(XMLHttpRequest, textStatus, errorThrown);
        };
        reqConfig.beforeSend = (req) => {
            ajaxConfig.beforeSend && ajaxConfig.beforeSend(req);
            var token = util.getCookie(util.token_key);
            if (null != token){
                req.setRequestHeader(util.token_key, token);
            }
        };

        $.ajax(reqConfig);
    });
}
util.login = function (appUserNo, password) {

    let self = this;
    return new Promise((resolve, reject) => {
        this.invokeServer({
            path: '/app/login',
            data: JSON.stringify({
                appUserNo: appUserNo,
                password: password
            }),
            type: 'POST',
            contentType: 'application/json'
        }).then((data, textStatus, response) => {
            try {
                //将data存储到cookie中
                self.setCookie(self.user_key,JSON.stringify(data.user));
                self.setCookie(self.model_key,JSON.stringify(data.modelList));
                self.setCookie(self.token_key, data.token);
                resolve(data);
                //util.emit('login');
            } catch (e) {
                reject(e);
                return;
            }
        },(err)=>{
            reject(err);
            return;
        })
    })
}

util.formatDateTime = function (value, fmt) {
    let date = parseDateTime(value);
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
util.formatDate = function(val){
    if(!val){
        return;
    }
    return this.formatDateTime(val,"yyyy-MM-dd");
}

util.formatMonth = function(val){
    if(!val){
        return;
    }
    return this.formatDateTime(val,"MM-dd");
}

function parseDateTime(value){
    //现在很多.0不知道哪里来的，先特殊处理一下
    // if(value.constructor==String && value.substring(value.length -2, value.length) == ".0"){
    //         value = value.substring(0, value.length - 2).replace(/\-/g, "/");
    // }
    if(value.constructor==String){
        var mi = value.split("\.");
        value = mi[0];
    }

    var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    //匹配"2014-01-01 12:00:00"
    if(value.constructor==String && reg.test(value)){
        value = value.replace(/\-/g, "/");
    }

    return new Date(value);
}
util.parseDateTime  = parseDateTime;

util.user = null;

var eventProxy = new Vue();

util.emit = eventProxy.$emit.bind(eventProxy);
util.on = eventProxy.$on.bind(eventProxy);
util.off = eventProxy.$off.bind(eventProxy);
util.once = eventProxy.$off.bind(eventProxy);

util.NP = NP;
export default util;
