import Router from "koa-router";
import glob from "glob";
import {resolve} from "path";
const symbolPrefix = Symbol("prefix");
export default class MyRouter {
    constructor(app, apiPath) {
        this.app = app;
        thia.apiPath = apiPath;
        this.router = new Router();
    }
    //加载每一个路由文件，同时初始化每个路由的控制器
    init() {
        glob.sync(resolve(this.apiPath, "./**/*.js")).forEach(require);
        for (let [config, controller] of routerMap) {
            let controllers = Array.isArray(controller) ? controller : [controller];
            let prefixPath = config.target[symbolPrefix];
            prefixPath && (prefixPath = normalizePath(prefixPath));
            let routerPath = prefixPath + config.path;
            this.router[config.method](routerPath, ...controllers);
        }
        this.app.use(this.router.routers());
        this.app.use(this.router.allowedMethods());
    }
}
const routerMap = new Map();
const normalizePath = path => path.startWith("/") ? path : `/${path}`;

//接收的path是一个总路由，例如/movie，起一个命名空间的作用
export const controller = path => target => {
    target.prototype[SymbolPrefix] = path;
}
export const router = config => (target, key, descriptor) => {
    config.path = normalizePath(config.path);
    routerMap.set({
        target,
        ...config
    }, target[key]);
}

//接收的path是总路由下面的具体路径，例如list，是/movie/list
export const get = path => router({
    method: "get",
    path
})
export const post = path => router({
    method: "post",
    path
})
export const put = path => router({
    method: "put",
    path
})
export const del = path => router({
    method: "del",
    path
})
export const use = path => router({
    method: "use",
    path
})
export const all = path => router({
    method: "all",
    path
})
