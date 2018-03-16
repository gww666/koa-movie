//子进程在跑
const puppeteer = require("puppeteer");
let url = "https://movie.douban.com/tag/#/?sort=R&range=6,10";
// import {sleep} from "../../utils";
const {sleep, gw} = require("../../utils");
(async () => {
    console.log("start！");
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url); 
    sleep(3000);
    await page.waitForSelector(".more");
    for (let i = 0; i < 1; i++) {
        
        await page.click(".more");
        console.log("点击了查看更多的按钮");
        console.log("等待3秒钟");
        await sleep(3000);
    }
    // let els = await page.$$eval(".item", items => items.length);
    console.log("开始爬取数据...")
    const result1 = await page.evaluate(() => {
        return new Promise(resolve => {
            let result = [];
            // let els = fn(".item");
            let els = document.querySelectorAll(".item");
            Array.prototype.forEach.call(els, item => {
                result.push({
                    doubanId: item.querySelector(".cover-wp").getAttribute("data-id"),//豆瓣id
                    title: item.querySelector(".title").innerHTML,//标题
                    rate: item.querySelector(".rate").innerHTML,//评分
                    imgUrl: item.querySelector(".pic img").src,//评分
                });
            });
            resolve(result);
        });
    });
    console.log("爬取数据结束")
    // console.log(result);
    await browser.close();
    process.send({result1});
    process.exit(0);
})();