import { core as $core } from './core';
import { numberTool as $numberTool } from './numberTool';
import { Watcher } from "./interface/Watcher";
import { Position } from "./interface/Position";

/*********************************************************
 ** 浏览器的工具
 ** <br><br>
 ** Date: Created in 2022/8/9 15:08
 ** @author loulan
 ** @version 0.0.0
 *********************************************************/
export namespace windowsTool {

    /**
     * 获取滚动轴的位置（参数默认是window）
     * @param       {any} el 元素
     * @return      {object} x,y坐标
     * @author     :loulan
     * */
    export const getScrollPosition = (el: any = window): Position => ({
        x: ($core.isExist(el.pageXOffset)) ? el.pageXOffset : el.scrollLeft,
        y: ($core.isExist(el.pageYOffset)) ? el.pageYOffset : el.scrollTop
    });

    /**
     * 设置滚动轴的位置
     * @param       {number} x x坐标轴
     * @param       {number} y y坐标轴
     * @param       {any} el 元素
     * @return      {void}
     * @author     :loulan
     * */
    export const setScrollPosition = (x: number, y: number, el: any = window): void => {
        if (!$numberTool.isNumber(x) || !$numberTool.isNumber(y)) {
            throw new TypeError("坐标类型必须是Number类型");
        }
        el.scrollTo(x, y);
    };

    /**
     * 获取页面的可视高度
     * @return      {number}页面可视高度
     * @author     :loulan
     * */
    export const pageViewHeight = (): number => {
        let doc = document;
        let docElm = doc.compatMode == "BackCompat" ? doc.body : doc.documentElement;
        return docElm.clientHeight;
    };

    /**
     * 获取页面可视宽度
     * @return      {number} 页面可视宽度
     * @author     :loulan
     * */
    export const pageViewWidth = (): number => {
        let doc = document;
        let docElm = doc.compatMode == "BackCompat" ? doc.body : doc.documentElement;
        return docElm.clientWidth;
    };

    /**
     * 监听获取页面可视宽度（动态获取）
     * @param       {Function} callback 回调函数，参数就是宽度，高度
     * @return      {void}
     * @author     :loulan
     * */
    export const watchPageView = (callback: Function): Watcher => {
        const watchFunction = () => {
            if ($core.isExist(callback) && $core.is(Function, callback)) {
                let screenWidth = parseFloat(pageViewWidth().toString());
                let screenHeight = parseFloat(pageViewHeight().toString());
                callback(screenWidth, screenHeight);
            }
        };
        /*设置了浏览器窗口监听，主要是为了浏览器高度发生变化时，实时响应改变框架内容部分总体高度*/
        window.addEventListener('resize', watchFunction);

        return {
            close() {
                window.removeEventListener("resize", watchFunction);
            },
            open() {
                window.addEventListener("resize", watchFunction);
            }
        };
    };

    /**
     * 监听获取鼠标的位置
     * @param       {Function} callback 回调函数，参数是坐标x,y
     * @return      {void}
     * @author     :loulan
     * */
    export const watchMousePosition = (callback: Function): Watcher => {
        const watchFunction = (event: MouseEvent) => {
            if ($core.isExist(callback) && $core.is(Function, callback)) {
                callback(parseFloat(event.pageX.toString()), parseFloat(event.pageY.toString()));
            }
        };

        window.addEventListener('mousemove', watchFunction);

        return {
            close() {
                window.removeEventListener("mousemove", watchFunction);
            },
            open() {
                window.addEventListener("mousemove", watchFunction);
            }
        };
    };

    /**
     * 文本复制
     * @param       {string} str 要复制的文本
     * @return      {boolean}赋值成功与否 true-复制成功，false-复制失败
     * @author     :loulan
     * */
    export const copyText = async (str: string): Promise<boolean> => {
        // 检查浏览器是否支持 Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                // 使用 Clipboard API 复制文本
                await navigator.clipboard.writeText(str);
                // 成功复制，返回 true
                return true;
            } catch (err) {
                // 复制失败，打印错误信息并返回 false
                console.error("复制失败 ", err);
                return false;
            }
        } else {
            // 如果不支持 Clipboard API，回退到传统方法
            // 创建一个隐藏的 textarea 元素
            const el = document.createElement("textarea");
            el.value = str;
            // 设置为只读，以避免拼写检查和自动更正
            el.setAttribute("readonly", "true");
            // 将 textarea 元素隐藏在页面之外
            el.style.position = 'fixed';
            el.style.left = "-9999px";
            el.style.top = "-9999px";
            el.style.padding = '0';
            el.style.border = 'none';
            el.style.outline = 'none';
            el.style.boxShadow = 'none';
            el.style.background = 'transparent';
            try {
                // 将 textarea 添加到文档中并选择其内容
                document.body.appendChild(el);
                el.select();
                // 使用 execCommand 方法执行复制操作
                const is: boolean = document.execCommand("copy");
                // 返回复制操作的结果
                return is;
            } catch (err) {
                // 复制失败，打印错误信息并返回 false
                console.error("复制失败",err);
                return false;
            } finally {
                // 无论如何都移除隐藏的 textarea 元素
                document.body.removeChild(el);
            }
        }
    };

    /**
     * 全屏显示
     * @param       {any} el 要进行全屏显示的组件，默认全屏的是浏览器
     * @return      {void}
     * @author     :loulan
     * */
    export const fullScreen = (el: any = document.body): void => {
        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        }
        //return true;
    };

    /**
     * 退出全屏状态
     * @param       {any} el 要进行操作的组件
     * @return      {void}
     * @author     :loulan
     * */
    export const exitFullscreen = (el: any = document): void => {
        if (el.exitFullScreen) {
            el.exitFullScreen();
        } else if (el.mozCancelFullScreen) {
            el.mozCancelFullScreen();
        } else if (el.webkitExitFullscreen) {
            el.webkitExitFullscreen();
        } else if (el.msExitFullscreen) {
            el.msExitFullscreen();
        }
        //return true;
    };

    /**
     * 判断当前是否是全屏的状态
     * @param       {any} el 要进行操作的组件
     * @return      {boolean}是否是全屏状态 true-全屏，false-非全屏
     * @author     :loulan
     * */
    export const isFullScreen = (el: any = document): boolean => {
        return !!(
            //document.fullscreen ||
            el.mozFullScreen ||
            el.webkitIsFullScreen ||
            el.webkitFullScreen ||
            el.msFullScreen
        );
    };

    /*********************************************************
     ** cookie操作的工具
     ** <br><br>
     ** Date: Created in 2022/8/9 15:07
     ** @author loulan
     ** @version 0.0.0
     *********************************************************/
    export namespace cookieTool {
        /**
         * cookie的设置（默认有效期设置为7天也就是168小时）
         * @param       {string} key cookie对应的key
         * @param       {string|number|boolean} value cookie的key对应的值数据
         * @param       {number} expireHours 延时时间，单位是小时
         * @return      {boolean}设置是否成功
         * @author     :loulan
         * */
        export const set = (key: string, value: string | number | boolean, expireHours: number = 168): boolean => {
            if ($core.isNotExist(document)) {
                console.error("document上下文不存在，无法设置cookie。");
                return false;
            }
            let path = "/";
            let date = Date.now() + expireHours * 60 * 60 * 1000; // cookie过期时间
            let expires = new Date(date).toUTCString();
            document.cookie = key + "=" + encodeURIComponent(value) + ((!expireHours) ? "" : ("; expires=" + expires)) + ";path=" + path + ";";
            return true;
        }

        /**
         * 获取指定key的cookie
         * @param       {string} key cookie对应的key
         * @return      {string|number|boolean} 获取出来的cookie值
         * @author     :loulan
         * */
        export const get = (key: string): string | number | boolean | undefined => {
            if ($core.isNotExist(document)) {
                console.error("document上下文不存在，无法获取cookie。");
                return undefined;
            }
            let reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
            // 从document.cookie中获取捕获的数据
            let arr = document.cookie.match(reg);
            return $core.isNotEmpty(arr) ? decodeURIComponent(arr![2]) : undefined;
        }

        /**
         * 删除指定的cookie
         * @param       {string} key cookie指定的key
         * @return      {boolean}删除是否成功
         * @author     :loulan
         * */
        export const del = (key: string): boolean => exist(key) ? set(key, "", -1) : true;

        /**
         * 判断指定key在cookie中是否存在
         * @param       {string}key cookie存储的键
         * @return      {boolean}存在与否
         * @author     :loulan
         * */
        export const exist = (key: string): boolean => {
            const value = get(key);
            if ($core.isExist(value)) {
                return true;
            } else {
                return false;
            }
        }
    }

    /*********************************************************
     ** localStorage操作的工具
     ** <br><br>
     ** Date: Created in 2022/8/9 15:07
     ** @author loulan
     ** @version 0.0.0
     *********************************************************/
    export namespace localStorageTool {
        /**
         * 设置本地存储
         * @param       {string}key 存储的键
         * @param       {string}value 存储的值
         * @return      {boolean} 是否存储成功
         * @author     :loulan
         * */
        export const set = (key: string, value: string): boolean => {
            if ($core.isNotExist(localStorage)) {
                console.error("localStorage对象不存在，无法设置localStorage。");
                return false;
            }
            if (typeof (value) === 'object') value = JSON.stringify(value);
            localStorage.setItem(key, value)
            return true;
        };

        /**
         * 获取本地存储的值
         * @param       {string}key 本地存储的键
         * @return      {string | undefined | null}键对应的值
         * @author     :loulan
         * */
        export const get = (key: string): string | undefined | null => {
            if ($core.isNotExist(localStorage)) {
                console.error("localStorage对象不存在，无法获取localStorage。");
                return undefined;
            }

            return localStorage.getItem(key);
        };

        /**
         * 删除指定的本地存储
         * @param       {string}key 本地存储的键
         * @return      {boolean}删除成功与否
         * @author     :loulan
         * */
        export const del = (key: string): boolean => {
            if ($core.isNotExist(localStorage)) {
                console.error("localStorage对象不存在，无法删除localStorage。");
                return false;
            }
            localStorage.removeItem(key)
            return true;
        };

        /**
         * 判断指定key在本地存储中是否存在
         * @param       {string}key 本地存储的键
         * @return      {boolean}存在与否
         * @author     :loulan
         * */
        export const exist = (key: string): boolean => {
            const value = get(key);
            if ($core.isExist(value)) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * 清空本地存储
         * @return      {boolean}清除成功与否
         * @author     :loulan
         * */
        export const clear = (): boolean => {
            if ($core.isNotExist(localStorage)) {
                console.error("sessionStorage对象不存在，无法获取sessionStorage。");
                return false;
            } else {
                localStorage.clear();
                return true;
            }
        }
    }

    /*********************************************************
     ** sessionStorage操作的工具
     ** <br><br>
     ** Date: Created in 2022/8/9 15:08
     ** @author loulan
     ** @version 0.0.0
     *********************************************************/
    export namespace sessionStorageTool {
        /**
         * 设置会话存储
         * @param       {string}key 存储的键
         * @param       {string}value 存储的值
         * @return      {boolean} 是否存储成功
         * @author     :loulan
         * */
        export const set = (key: string, value: string): boolean => {
            if ($core.isNotExist(sessionStorage)) {
                console.error("sessionStorage对象不存在，无法设置sessionStorage。");
                return false;
            }

            sessionStorage.setItem(key, value);
            return true;
        };

        /**
         * 获取会话存储的值
         * @param       {string}key 会话存储的键
         * @return      {string | undefined | null}键对应的值
         * @author     :loulan
         * */
        export const get = (key: string): string | undefined | null => {
            if ($core.isNotExist(sessionStorage)) {
                console.error("sessionStorage对象不存在，无法获取sessionStorage。");
                return undefined;
            }
            return sessionStorage.getItem(key)
        };

        /**
         * 删除指定的会话存储
         * @param       {string}key 会话存储的键
         * @return      {boolean}删除成功与否
         * @author     :loulan
         * */
        export const del = (key: string): boolean => {
            if ($core.isNotExist(sessionStorage)) {
                console.error("sessionStorage对象不存在，无法删除sessionStorage。");
                return false;
            }
            sessionStorage.removeItem(key)
            return true;
        };

        /**
         * 判断指定key在会话存储中是否存在
         * @param       {string}key 会话存储的键
         * @return      {boolean}存在与否
         * @author     :loulan
         * */
        export const exist = (key: string): boolean => {
            const value = get(key);
            if ($core.isExist(value)) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * 清空会话存储
         * @return      {boolean}清除成功与否
         * @author     :loulan
         * */
        export const clear = (): boolean => {
            if ($core.isNotExist(sessionStorage)) {
                console.error("sessionStorage对象不存在，无法获取sessionStorage。");
                return false;
            } else {
                sessionStorage.clear();
                return true;
            }
        }
    }
}
