import { core as $core } from './core';
import { numberTool as $numberTool } from './numberTool';

/*********************************************************
 ** 函数操作工具
 ** <br><br>
 ** Date: Created in 2022/8/9 15:10
 ** @author loulan
 ** @version 0.0.0
 *********************************************************/
export namespace functionTool {

    /**
     * 让源数据覆盖并合并目标数据
     * 用法用处: 很多时候后端返回来的json数据的null项时不存在的,也就是生成json的时候就被干掉了,使用这部分数据
     * 进行动态显示的时候,就会造成一些项的未定义而报错,所以将我们自己定义的对象和返回的数据合并被覆盖,这样需要的
     * 数据都会存在,
     *
     * 注意：这个对象的合并只能进行第一层对象属性的覆盖合并，对象中的对象会被直接覆盖而不是合并
     * @param       {object}target 要被覆盖合并的目标对象
     * @param       {object}source 进行合并覆盖的源数据
     * @return      {object}target 合并后的目标对象
     * @author     :loulan
     * */
    export const combineObj = (target: object, source: object): object => {
        // 先判断对象是否存在，如果不存在就是这位空对象
        target = $core.isExist(target) ? target : {};
        source = $core.isExist(source) ? source : {};

        // 然后判断这连个值是否是对象，如果有一个不是对象，那么就抛出错误
        if (!$core.is(Object, target) || !$core.is(Object, source)) {
            throw new Error("当前方法只支持进行对象数据的合并");
        }

        return Object.assign(target, source);
    };

    /**
     * 深度复制对象数据，这样避免了指针指向同一个对象导致的关联修改
     * @param       {object|Array<any>}data 要复制的数据
     * @return      {object|Array<any>}copy 复制出来的数据
     * @author     :loulan
     * */
    export const deepCopy = <T extends object | Array<any>>(data: T): T => {
        const map: Map<string, string> = new Map<string, string>([
            ['[object Boolean]', 'boolean'],
            ['[object Number]', 'number'],
            ['[object String]', 'string'],
            ['[object Function]', 'function'],
            ['[object Array]', 'array'],
            ['[object Date]', 'date'],
            ['[object RegExp]', 'regExp'],
            ['[object Undefined]', 'undefined'],
            ['[object Null]', 'null'],
            ['[object Object]', 'object']
        ]);
        const t: string | undefined = map.get(Object.prototype.toString.call(data));

        if (t === 'array') {
            let tmpData: Array<any> = data as Array<any>;
            const o = new Array<any>();
            for (let i = 0; i < tmpData.length; i++) {
                o.push(deepCopy(tmpData[i]));
            }

            return o as T;
        } else if (t === 'object') {
            let tmpData: object = data as object;
            const o = {};
            for (let i in tmpData) {
                Reflect.set(o, i, deepCopy(tmpData[i as keyof typeof tmpData]));
            }
            return o as T;
        } else {
            return data;
        }
    };

    /**
     * 防抖函数（按钮等有时候点击可以不小心连续点击导致的抖动多次执行）
     * @param   {Function}callback 回调函数
     * @param   {number} delay 抖动延时时间，默认是100ms（单位毫秒）
     * @return  {Function} 防抖动可执行函数。
     * @author     :loulan
     * */
    export const antiShake = (callback: Function, delay: number = 100): Function => {
        // 回调方法必须存在
        if ($core.isNotExist(callback)) {
            throw new Error("callback回调函数不存在。");
        }
        // 回调方法必须是函数类型
        if (!$core.is(Function, callback)) {
            throw new TypeError("callback函数类型不正确，只能是函数方法。");
        }

        // 如果延时时间不存在就设置位100
        delay = $core.isExist(delay) ? delay : 100;
        // 延时时间必须是数字类型
        if (!$numberTool.isNumber(delay)) {
            throw new TypeError("延时时间必须是数字Number类型。")
        }

        let timer: number | undefined = undefined;
        return (...args: any) => {
            clearTimeout(timer);
            timer = setTimeout(() => { callback(...args) }, delay);
        }
    }
}
