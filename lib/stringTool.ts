import {core as $core} from './core';

/*********************************************************
 ** 字符串操作工具
 ** <br><br>
 ** Date: Created in 2022/8/9 15:10
 ** @author loulan
 ** @version 0.0.0
 *********************************************************/
export namespace stringTool {
    /**
     * 判断数据是否符合正则表达式
     * 正则表达式修饰符
     *      i - 执行对大小写不敏感的匹配。
     *      g - 执行全局匹配
     *      m - 执行多行匹配
     * @param       {RegExp|string} regexStr 可以是字符串，也可以是正则表达式
     * @param       {string} val 要进行判断的数据（字符串）
     * @return      {boolean} true-是 ; false-否。 数据是否匹配正则表达式
     * @author     :loulan
     * */
    export const isMatch = (regex: RegExp|string, val: string): boolean => {
        if ($core.isNotExist(regex)) {
            throw new Error("正则表达式不能为空。");
        }

        return new RegExp(regex).test(val);
    };

    /**
     * 将下划线字符串转换为驼峰式的字符串
     * @param       {string}str 要进行转换的字符串
     * @return      {string}去掉下划线改为驼峰式的字符串
     * @author     :loulan
     * */
    export const underlineToCamel = (str: string): string => {
        // 如果数据不存在就直接返回
        if ($core.isNotExist(str)) {
            return str;
        }

        // 数据存在但是不是字符串，那么就抛出错误
        if (!$core.is(String, str)) {
            throw new TypeError("您的数据类型不正确，只能是字符串");
        }

        /*
        * 1. 先将大写字符开头的部分转换为 -XXX
        * 2. 全部转换为小写
        * 3. 将 -._都转换为 -
        * 4. 如果首尾有-那么就将其去掉
        * 5. 以-为字符进行字符串转换为数组
        * */
        const arr = str
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase()
            .replace(/[_.\- ]+/g, '-')
            .replace(/(^-)|(-$)/g, '')
            .split('-');

        // 将数组中的第一位提取并删除（第一位字符不需要首字母转大写）
        let ret = arr[0];
        arr.shift();

        // 将数组中的其他字符首字母变成大写，然后将所有的字符连接返回
        return ret + arr.map(item => item.replace(/\w/, ($1) => $1.toUpperCase())).join('');
    }

    /**
     * 将驼峰式的字符串转化为下划线的（转换完后默认是小写的）
     * @param       {string}str 要进行转换的字符串
     * @return      {string}带下划线的字符串
     * @author     :loulan
     * */
    export const camelToUnderline = (str: string): string => {
        // 如果数据不存在就直接返回
        if ($core.isNotExist(str)) {
            return str;
        }

        // 数据存在但是不是字符串，那么就抛出错误
        if (!$core.is(String, str)) {
            throw new TypeError("您的数据类型不正确，只能是字符串");
        }

        return str.replace(/\B([A-Z])/g, '_$1').toLowerCase();
    }
}
