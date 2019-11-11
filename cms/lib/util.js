let common = {
    uuid: function (len, radix) {   //指定长度和进制基数 uuid(8, 16) // "098F4D35"
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            let r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('') + Date.parse(new Date());
    },

    checkNumberType: function (numStr, mode) {
        //let arr = /^-?(?:0|[1-9]\d+)(\.\d+)?$/.exec(numStr);
        let arr = /^-?(?:\d+)(\.\d+)?$/.exec(numStr);
        if (arr) {
            if (arr[1]) {
                //小数
                return mode === 0 ? 1 : parseFloat(numStr);
            }
            else {
                //整数;
                return mode === 0 ? 0 : parseInt(numStr);
            }
        }
        else {
            //非正常数字;
            return mode === 0 ? -1 : null;
        }
    },
    dashboardNumFormatter: function (str, _isAddSpace, decimalPlaces = 2) {//str为管道符之前计算得到的结果，默认框架会帮你传入，此方法必须返回一个值
        let lang = navigator.languages ? navigator.languages[0] : (navigator.browserLanguage || navigator.language || navigator.systemLanguage),
            enLang = new RegExp('^en');
        let isAddSpace = typeof (_isAddSpace) === 'undefined' ? true : _isAddSpace;

        if (str === null || typeof (str) === 'undefined' || str === '' || str === 'null' || str === '-') {
            return '-';
        }

        str = str.toString();

        //判断是否为百分数，删除百分号，保留数字字符串部分
        let isPercentValue = false;
        let strRemovedPercent = str.toString().replace(/\%/, '');

        if (strRemovedPercent !== str) {

            isPercentValue = true;
        }

        function formateToUnitNum (number) {

            let formatedNumber = '';
            //是否是负数
            let isMinus = false;

            if (number < 0) {
                isMinus = true;
                number = 0 - number;
            }

            let space = isAddSpace ? ' ' : '';

            let zhNumSections = [{
                'divisor': 100000000,
                'unit': space + '亿'
            }, {
                'divisor': 10000,
                'unit': space + '万'
            }, {
                'divisor': 1,
                'unit': ''
            }];
            let enNumSections = [{
                'divisor': 1000000000,
                'unit': space + 'Bil'
            },{
                'divisor': 1000000,
                'unit': space + 'M'
            },{
                'divisor': 1000,
                'unit': space + 'K'
            },{
                'divisor': 1,
                'unit': ''
            }];

            let numSections = enLang.test(lang) ? enNumSections : zhNumSections;
            for (let i = 0; i < numSections.length; i++) {

                let section = numSections[i];

                if (number < section.divisor && i !== (numSections.length - 1)) {
                    continue;
                }

                let sectionedNumber = Math.floor(number / section.divisor) + ((number % section.divisor) / section.divisor);

                if(section.divisor === 1){
                    formatedNumber = str;
                }else {
                    formatedNumber = sectionedNumber.toFixed(decimalPlaces) + section.unit;
                    formatedNumber = isMinus ? '-' + formatedNumber : formatedNumber;
                }
                break;

            }
            return formatedNumber;
        }

        let num = parseFloat(str);
        if (isNaN(num)) {
            return '';
        }

        if (isPercentValue) {
            return num.toFixed(decimalPlaces) + '%';
        }

        return formateToUnitNum(num);
    },

    removeNegativeSign: function (numStr) {
        return numStr.indexOf('-') === 0 ? numStr.substr(1) : numStr;
    },

    now: Date.now || function () {
        return new Date().getTime();
    },

    debounce(func, wait, immediate){
        let timeout, args, context, timestamp, result;

        let later = function () {
            let last = common.now() - timestamp;

            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };

        return function () {
            context = this;
            args = arguments;
            timestamp = common.now();
            let callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    },

    throttle(func, wait, options){
        let context, args, result;
        let timeout = null;
        let previous = 0;
        if (!options) options = {};
        let later = function () {
            previous = options.leading === false ? 0 : common.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function () {
            let now = common.now();
            if (!previous && options.leading === false) previous = now;
            let remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    },

    stringToDate(dateStr){
        let match = /^((?:([\d)]{4})[-])?(?:([\d]{1,2})[-]([\d]{1,2})))?[\sT]*((?:([\d]{1,2}):)([\d]{1,2})(?::([\d]{1,2}))?)?$/.exec(dateStr);
        if (match) {
            let year = new Date().getFullYear(),
                month = new Date().getMonth(),
                day = new Date().getDate(),
                hour = 0,
                min = 0,
                sec = 0;
            if (match[1]) {
                year = match[2] || new Date().getFullYear();
                month = parseInt(match[3]) - 1;
                day = match[4];
            }
            if (match[5]) {
                hour = match[6];
                min = match[7];
                sec = match[8] || 0;
            }
            return new Date(year, month, day, hour, min, sec);
        }
    },

    lightenDarkenColor(col, amt) {

        let usePound = false;

        if (col[0] == '#') {
            col = col.slice(1);
            usePound = true;
        }

        let num = parseInt(col, 16);

        let r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        let b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        let g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
    }
};

Date.prototype.format = function (format) {
    // format="yyyy-MM-dd hh:mm:ss";
    let o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4
            - RegExp.$1.length));
    }

    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
};

Number.prototype.format = function (unit) {
    if (unit == undefined) unit = true;
    let num = this;
    if (num > 1000000) {
        return Math.floor(num / 10000) / 100 + (unit ? 'M' : '');
    }
    if (num > 1000) {
        return Math.floor(num / 10) / 100 + (unit ? 'K' : '');
    }
    return Math.floor(num);
};

Number.prototype.formatNumber = function (unit) {
    if (unit == undefined) unit = true;
    let num = this;
    if (num > 10000) {
        return Math.floor(num / 100) / 100 + (unit ? 'W' : '');
    }
    return Math.floor(num);
};

Number.prototype.formatPercent = function (n) {
    let num = this;
    if (isNaN(num) || num === '' || num == Infinity || num === -Infinity)return '-';
    num = Math.round(num * 10000);
    return (!!n || n == 0) ? (num / 100).toFixed(n) + '%' : num / 100 + '%';
};

Number.prototype.formatSeparate = function (n = 2) {
    let num = this;
    if (isNaN(num))return '-';
    if (num === Infinity || num === -Infinity)return '-';
    return num.toFixed(n).replace(/^\d+/g, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','));
};

window.imgErrorHandle = function (obj) {
    obj.parentNode.innerHTML = '<div class=\'img-error\'></div>';
};

export default common;
