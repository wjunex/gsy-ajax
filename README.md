## 安装

```shell
npm i gsy-ajax
```



## 使用


```javascript
import ajax from 'gsy-ajax'

ajax.config({
   encryptionOff: 1,
   RSA: "",
   appKey: "6269762D07D049CCBF56A9775D2B7F74",
   appSecret: "3DE8394393E14AB69A46CAF3A39F366E",
});

ajax.post(url, data, config)，then((res) => {
    //...
}).catch((error) => {
    //...
})
```