// 判断是否是手机端打开的网页-动态加载main文件
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    Promise.all([import('./mainMobile.js')]).then(() => {})
} else {
    Promise.all([import('./mainPc.js')]).then(() => {})
}