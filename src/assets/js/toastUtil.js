
import { Toast } from "vant";
import { isStringNull } from "./EmptyUtil";

export function toastMessage(msg) {
    if (typeof msg !== 'string') {
        msg = JSON.stringify(msg);
    }
    // if (msg && weex.config.env.platform.toLowerCase()=="android") {
    //     //安卓需要对特殊字符转义（%）
    //     msg = encodeURIComponent(msg);
    // }

    Toast(msg || "");
}


export function toastLoading(msg) {
    msg = isStringNull(msg) ? "加载中..." : msg;
    Toast.loading({
        message: msg,
        forbidClick: true,
        duration: 0
    });
}

export function clearToast() {
    Toast.clear();
}