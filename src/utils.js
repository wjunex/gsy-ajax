/**
 * 工具类
 */
import CryptoJS from 'crypto-js';
import md5 from 'js-md5';

export const utils = {
  // 加密
  encrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : Date.parse(new Date());
    let key = CryptoJS.enc.Utf8.parse(keyStr); // Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  },
  // 解密
  decrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : Date.parse(new Date());
    let key = CryptoJS.enc.Utf8.parse(keyStr); // Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    let decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
  // UUID
  uuid(len, radix) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
      '',
    );
    let uuid = [];
    let i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
      // rfc4122, version 4 form
      let r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '';
      uuid[14] = '4';

      // Fill in random data. At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  },
  // MD5加密
  MD5(arg) {
    return md5(arg);
  },
  // 16位随机数
  random16() {
    let num = '';
    for (let i = 0; i < 16; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  },
  // 获取url参数
  getUrlParams(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);

    return r != null ? decodeURI(r[2]) : null;
  },
  dateFormat(fmt, date) {
    console.log(fmt);
    let ret;
    let opt = {
      Y: date.getFullYear().toString(), // 年
      m: (date.getMonth() + 1).toString(), // 月
      d: date.getDate().toString(),
      day: date.getDay().toString(), // 星期
      H: date.getHours().toString(), // 时
      M: date.getMinutes().toString(), // 分
      S: date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    if (opt.m < 10) {
      opt.m = '0' + opt.m;
    }
    if (opt.d < 10) {
      opt.d = '0' + opt.d;
    }
    // let str = opt.m + '月' + opt.d + '日' + dayArr[opt.day];
    let str = opt.Y + '-' + opt.m + '-' + opt.d;
    return str;
  },
};

// 身份证正则表达式
export const CARD_REG = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx])|([1−9]\d5\d2((0[1−9])|(10|11|12))(([0−2][1−9])|10|20|30|31)\d2[0−9Xx])$/;

// 手机正则表达式
export const PHONE_REG = /^0?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;

// 邮箱正则表达式
export const EMAIL_REG = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

const getOsVersion = () => {
  let u = navigator.userAgent;
  let version = '';
  if (u.indexOf('Mac OS X') > -1) {
    // ios
    var regStrSaf = /OS [\d._]*/gi;
    var verinfo = u.match(regStrSaf);
    version =
      'IOS' + (verinfo + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.');
  } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    // android
    version =
      'Android' +
      u.substr(
        u.indexOf('Android') + 8,
        u.indexOf(';', u.indexOf('Android')) - u.indexOf('Android') - 8,
      );
  } else if (u.indexOf('BB10') > -1) {
    // 黑莓bb10系统
    version =
      'blackberry' +
      u.substr(
        u.indexOf('BB10') + 5,
        u.indexOf(';', u.indexOf('BB10')) - u.indexOf('BB10') - 5,
      );
  } else if (u.indexOf('IEMobile') > -1) {
    // windows phone
    version =
      'winphone' +
      u.substr(
        u.indexOf('IEMobile') + 9,
        u.indexOf(';', u.indexOf('IEMobile')) - u.indexOf('IEMobile') - 9,
      );
  } else {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('windows nt 5.0') > -1) {
      version = 'Windows 2000';
    } else if (
      userAgent.indexOf('windows nt 5.1') > -1 ||
      userAgent.indexOf('windows nt 5.2') > -1
    ) {
      version = 'Windows XP';
    } else if (userAgent.indexOf('windows nt 6.0') > -1) {
      version = 'Windows Vista';
    } else if (
      userAgent.indexOf('windows nt 6.1') > -1 ||
      userAgent.indexOf('windows 7') > -1
    ) {
      version = 'Windows 7';
    } else if (
      userAgent.indexOf('windows nt 6.2') > -1 ||
      userAgent.indexOf('windows 8') > -1
    ) {
      version = 'Windows 8';
    } else if (userAgent.indexOf('windows nt 6.3') > -1) {
      version = 'Windows 8.1';
    } else if (
      userAgent.indexOf('windows nt 6.2') > -1 ||
      userAgent.indexOf('windows nt 10.0') > -1
    ) {
      version = 'Windows 10';
    } else {
      version = 'Unknown';
    }
  }
  return version;
};
// webp图片处理
export const urlWebP = src => {
  const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  const getUrl = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
  const version = getOsVersion();
  const whiteList = [];
  if (/\.jpg$|.png$|.jpeg$|.gif$/.test(src)) {
    if (isIOS) {
      let [a] = version.replace('IOS', '').split('.');
      if (a >= 14) {
        return (
          src +
          (whiteList.includes(getUrl.exec(src)[0])
            ? '!webp'
            : '?x-oss-process=image/format,webp')
        );
      } else {
        return src;
      }
    } else {
      let [a] = version.replace('Android', '').split('.');
      let isW = version.indexOf('Windows');
      let isMac = version.indexOf('IOS');
      if (a >= 7 || isW !== -1 || isMac !== -1) {
        return (
          src +
          (whiteList.includes(getUrl.exec(src)[0])
            ? '!webp'
            : '?x-oss-process=image/format,webp')
        );
      } else {
        return src;
      }
    }
  } else if (/\.webp$|/.test(src)) {
    if (isIOS) {
      let [a] = version.replace('IOS', '').split('.');
      return a < 14 ? src + '?x-oss-process=image/format,png' : src;
    } else {
      let [a] = version.replace('Android', '').split('.');
      let isW = version.indexOf('Windows');
      let isMac = version.indexOf('IOS');
      if (a >= 7 || isW !== -1 || isMac !== -1) {
        return src;
      } else {
        return src + '?x-oss-process=image/format,png';
      }
    }
  } else {
    return src;
  }
};

// 阻止ios中回弹效果 start

let iosTrouchObj = {};
function addEventListenerTouchmove(e) {
  if (!iosTrouchObj.hasOwnProperty(iosTrouchObj.that.$route.path)) {
    return;
  }
  if (!e.isSCROLL) {
    e.preventDefault(); // 阻止默认事件(上下滑动)
  } else {
    const $el = iosTrouchObj[iosTrouchObj.that.$route.path];
    // 需要滑动的区域
    let top = $el.scrollTop; // 对象最顶端和窗口最顶端之间的距离
    let scrollH = $el.scrollHeight; // 含滚动内容的元素大小
    let offsetH = $el.offsetHeight; // 网页可见区域高
    let cScroll = top + offsetH; // 当前滚动的距离

    // 被滑动到最上方和最下方的时候
    if (top === 0) {
      top = 1; // 0～1之间的小数会被当成0
    } else if (cScroll === scrollH) {
      $el.scrollTop = top - 0.1;
    }
  }
}
window.addEventListenerTouchmove = addEventListenerTouchmove;

export const iosTrouchFn = function (el, cc) {
  // 你需要滑动的dom元素
  iosTrouchObj.that = this;
  let ios = navigator.userAgent.indexOf('iphone'); // 判断是否为ios
  if (ios === -1) {
    // el需要滑动的元素
    el.addEventListener('touchmove', function (e) {
      e.isSCROLL = true;
    });
    iosTrouchObj[this.$route.path] = {
      $el: el,
    };
    document.body.addEventListener('touchmove', addEventListenerTouchmove, {
      passive: false,
    }); // passive防止阻止默认事件不生效
  }
};

// 阻止ios中回弹效果 end
