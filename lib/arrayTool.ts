import { core as $core } from './core';
// import { Tree } from "./interface/Tree";

/*********************************************************
 ** 数组工具
 ** <br><br>
 ** Date: Created in 2022/8/9 15:10
 ** @author loulan
 ** @version 0.0.0
 *********************************************************/
export namespace arrayTool {
    /**
     * 判断一个对象是否是数组类型的数据
     * @param       {any} val 要进行判断的数据
     * @return      {boolean} true-是 ; flase-否
     * @author     :loulan
     * */
    export const isArray = (val: any): boolean => Array.isArray(val);

    /**
     * 将数组list集合转化为树状(递归方式)
     * @param       {Array<object>} arr 数组list等
     * @param       {string} idName id属性的字段名称，有的是uuid
     * @param       {string} pidName pid属性的字段名称
     * @param       {string|number|null} pidValue 顶级父类的pid的值,默认值为null
     * @return      {Array<Tree>|undefined} tree 树状数据
     * @author     :loulan
     * */
    export const arrayToTree = (arr: Array<any>, idName: string, pidName: string, pidValue: string | number | null = null): Array<any> | undefined => {
        if (!isArray(arr)) {
            // 如果不是数据就返回undefined
            return undefined;
        }

        if ($core.isEmpty(arr)) {
            // 如果数组为空也是返回undefined
            return arr;
        }

        if ($core.isNotExist(idName) || $core.isNotExist(pidName) || !$core.is(String, idName) || !$core.is(String, pidName)) {
            throw new Error("属性名称【字符串类型】的设置不能为空!");
        }

        return arr.filter(item => item[pidName] === pidValue)
            .map(item => ({
                ...item,
                children: arrayToTree(arr, idName, pidName, item[idName])
            }));
    }
}
