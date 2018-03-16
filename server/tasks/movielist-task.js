//父进程跑一个子进程
const cp = require("child_process");
const {resolve} = require("path");

(async () => {
    let scriptPath = resolve(__dirname, "../crawler/movielist.js");
    let invoked = false;
    let child = cp.fork(scriptPath, []);
    //监听error事件
    child.on("error", error => {
        if (invoked) return;
        invoked = true;
        console.log(error);
    });
    //监听exit事件
    child.on("exit", code => {
        if (invoked) return;
        invoked = false;
        let error = code === 0 ? null : new Error("exit code: " + code);
        console.log(error);
    });

    child.on("message", data => {
        console.log("这里接收到data", data.result1);
        // let result = data.result;
    });
})();
