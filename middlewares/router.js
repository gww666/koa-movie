const {resolve} = require("path");
const MyRouter = require("../lib/decorator");
export default Router = app => {
    let apiPath = resolve(__dirname, "../routers");
    let r = new MyRouter(app, apiPath);
    r.init();
}