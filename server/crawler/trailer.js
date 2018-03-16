const puppeteer = require("puppeteer");
const {sleep} = require("../../utils");
(async () => {
    let url = "https://movie.douban.com/subject/";
    let doubanId = "26654498";
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url + doubanId, {
        waitUntil: "networkidle2"
    });
    // console.log(url + doubanId);
    sleep(1000);

    let result = await page.evaluate(() => {
        let $ = window.$;
        let it = $(".related-pic-video");
        if (it && it.length > 0) {
            //拿到cover
            return {
                cover: it.find("img").attr("src"),
                link: it.attr("href")
            };
        }
        return {};
    });

    // console.log("result,", result);
    let videoSrc;
    if (result.link) {
        await page.goto(result.link, {
            waitUntil: "networkidle2"
        });
        sleep(1000);
        videoSrc = await page.evaluate(() => {
            let $ = window.$;
            let it = $("source");
            if (it && it.length > 0) {
                return it.attr("src");
            }
            return "";
        });
    }
    await browser.close();
    let data = {
        doubanId,
        cover: result.cover,
        videoSrc
    }
    process.send(data);
    process.exit(0);
})();