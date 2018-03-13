const {resolve} = require("path");
const Koa = require("koa");
const app = new Koa();
// const pug = require("pug");
const views = require("koa-views");
// const {pugTpl} = require("../tpl");
app.use(views(resolve(__dirname, "./views"), {
    extension: "pug"
}));
app.use(async (ctx, next) => {
    // ctx.body = "电影首页";
    // ctx.body = pug.render(pugTpl);
    await ctx.render("index", {});
});
app.listen(3000);