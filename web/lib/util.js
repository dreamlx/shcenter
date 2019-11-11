let common = {
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
