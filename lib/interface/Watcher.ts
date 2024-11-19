/*********************************************************
 ** 监听器对象接口
 ** <br><br>
 ** Date: Created in 2022/8/30 11:29
 ** @author loulan
 ** @version 0.0.0
 *********************************************************/
export interface Watcher {
    // dom组件元素
    el?: any;

    /**
     * 关闭监听器
     * @return      {void} 没有返回
     * @author     :loulan
     * */
    close():void;

    /**
     * 打开监听器
     * @return      {void} 没有返回
     * @author     :loulan
     * */
    open():void;
}
