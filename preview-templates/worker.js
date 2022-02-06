// 用于网页在后台时保持引擎持续运行的 Worker 脚本

// 调用间隔
const interval = 1000 / 60;

// 递归函数
function call() {
    postMessage(1);
    // 直接调用函数会有问题
    setTimeout('call()', interval);
}
call();
