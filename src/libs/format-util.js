function internalFormatDateTime(value, fmt) {
    //现在很多.0不知道哪里来的，先特殊处理一下
    if(value.constructor==String && value.substring(value.length -2, value.length) == ".0"){
            value = value.substring(0, value.length - 2).replace(/\-/g, "/");
    }

    var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    //匹配"2014-01-01 12:00:00"
    if(value.constructor==String && reg.test(value)){
        value = value.replace(/\-/g, "/");
    }

    var date = new Date(value);
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
export function formatYD(val) {
    if (!val) {
        return;
    }
    return internalFormatDateTime(val, 'yyyy-MM');
}

export function formatDateTime(val,fmt){
    if (!val) {
        return;
    }
    return internalFormatDateTime(val, fmt);
}

export function formatDate(val) {
    if (!val) {
        return;
    }
    return internalFormatDateTime(val, 'yyyy-MM-dd');
};
export function formatDateToChineseChar (val) {
    if (!val) {
        return;
    }
    return internalFormatDateTime(val, 'yyyy年MM月dd日');
};
export function formatTime(val) {
    if (!val) {
        return;
    }
    return internalFormatDateTime(val, 'yyyy-MM-dd hh:mm:ss');
};
export  function formatDayTime(val){
    if (!val) {
        return;
    }
    return internalFormatDateTime(val, 'hh:mm:ss');
};
export  function formatYearMonth(val) {
    if (!val) {
        return;
    }
    return internalFormatDateTime(val, 'yyyy-MM');
};


export default {
    formatDateTime,
    formatDate,
    formatDateToChineseChar,
    formatTime,
    formatDayTime,
    formatYearMonth,
}