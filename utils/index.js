module.exports = {
    //睡眠给定的时间值
    sleep: time => new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    }),
    gw: selector => {
        return document.querySelectorAll(selector).length > 1 ? document.querySelectorAll(selector) : document.querySelector(selector);
    }
}