import axios from "axios";
import { utils } from './utils';
import { JSEncrypt } from '@dcb/jsencrypt';

const ajax = function () {
  const that = this;
  that.encryptionOff = 0; // 加解密开关
  that.RSA = null;
  that.clientId = null
  that.appKey = null;
  that.appSecret = null;
  that.authorization = null

  // 初始化配置
  const config = async ({
    RSA,
    encryptionOff = 0,
    clientId = "03",
    appKey,
    appSecret,
    authorization
  }) => {
    that.RSA = RSA;
    that.encryptionOff = +encryptionOff;
    that.clientId = clientId;
    that.appKey = appKey;
    that.appSecret = appSecret;
    that.authorization = authorization
  }

  /**发送请求 */
  const request = async (method, url, data, config = {}) => {
    let options = {
      ...config,
      url,
      method
    }

    options.headers = {
      clientId: that.clientId,
      path: url.replace(/^https?:\/\/.+?\/([^/]+)/, ''),
      timestamp: Date.now(),
      sign: getSign(url),
      appKey: that.appKey,
      Authorization: that.authorization,
    }

    // 是否加密请求参数
    if (method === 'post' && !config.white && that.encryptionOff) {
      options.data = encryptData(data)
    } else {
      options.data = data;
    }

    return new Promise((resolve, reject) => {
      axios.request(options).then(async (res) => {
        let { data } = res;
        if (!data) {
          return resolve(data);
        }
        // 是否解密响应数据
        if (method === 'post' && !data.status) {
          data = decryptData(res)
        }
        resolve(data)
      }).catch(async (error) => {
        reject(error)
      })
    })
  }

  /**生成签名 */
  const getSign = (url) => {
    let asHex = ''
    for (let [key, value] of Object.entries({
      clientId: that.clientId,
      path: url.replace(/^https?:\/\/.+?\/([^/]+)/, ''),
      timestamp: Date.now(),
    })) {
      asHex += key + value;
    }
    return utils.MD5(asHex + that.appSecret).toUpperCase() || '';
  }

  /**加密数据 */
  const encryptData = (data) => {
    const aesKey = utils.random16(); // 生成16位随机数
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(that.RSA);
    const uuid = utils.uuid();
    const secret = '4RBA7^@0$@KM$5D2333';
    const title = utils.MD5(uuid + secret);
    const init = encrypt.encrypt(aesKey);
    const base = utils.encrypt(JSON.stringify(data), aesKey);
    return {
      timestamp: uuid,
      title,
      init,
      base,
    }
  }

  /**解密数据 */
  const decryptData = (res) => {
    let { data } = res;
    const decrypt = new JSEncrypt();
    decrypt.setPublicKey(that.RSA);
    return JSON.parse(
      utils.decrypt(data.base, decrypt.decryptPublicKey(data.init)),
      res,
    );
  }

  const get = (url, config) => {
    return request('get', url, null, config);
  }
  const post = (url, data, config) => {
    return request('post', url, data, config);
  }
  const del = (url, config) => {
    return request('delete', url, null, config);
  }
  const head = (url, config) => {
    return request('head', url, null, config);
  }
  const put = (url, data, config) => {
    return request('put', url, data, config);
  }
  const patch = (url, data, config) => {
    return request('path', url, data, config);
  }
  const setCommonHeader = (key, value) => {
    window.axios.defaults.headers.common[key] = value;
  }

  return {
    config,
    request,
    get,
    post,
    del,
    head,
    put,
    patch,
    setCommonHeader
  }
}



export default new ajax()