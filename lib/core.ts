/*********************************************************
 ** 核心基础工具
 ** <br><br>
 ** Date: Created in 2022/8/9 15:10
 ** @author loulan
 ** @version 0.0.0
 *********************************************************/
export namespace core {
    /**
     * 判断数据是否是指定的数据类型
     * @param      {any} type 数据类型
     * @param      {any} val 数据
     * @return     {boolean} 数据类型是否匹配
     * @author     :loulan
     * */
    export const is = <T>(type: T, val: any): boolean => isExist(val) && val.constructor === type;

    /**
     * 判断数据是否为null
     * @param       {any} val 要进行判断的参数
     * @return      {boolean} true-表示数据为null ; false-表示数据不为null
     * @author     :loulan
     * */
    export const isNull = (val: any): boolean => val === null;

    /**
     * 判断数据是否不为null
     * @param       {any} val 要进行判断的数据
     * @return      {boolean} true-表示数据不为null ; false-表示数据为null
     * @author     :loulan
     * */
    export const isNotNull = (val: any): boolean => !isNull(val);

    /**
     * 判断数据是否为undefined
     * @param       {any} val 要进行判断的参数
     * @return      {boolean} true-表示数据为undefined ; false-表示数据不为undefined
     * @author     :loulan
     * */
    export const isUndefined = (val: any): boolean => val === undefined;

    /**
     * 判断数据是否不为undefined
     * @param       {any} val 要进行判断的数据
     * @return      {boolean} true-表示数据不为undefined ; false-表示数据为undefined
     * @author     :loulan
     * */
    export const isNotUndefined = (val: any): boolean => !isUndefined(val);

    /**
     * 判断一个数据是否存在，即既不是undefined也不是null
     * @param       {Any}val 要进行判断的数据
     * @return      {Boolean} true-存在 ; false-不存在
     * @author     :loulan
     * */
    export const isExist = (val: any): boolean => isNotUndefined(val) && isNotNull(val);

    /**
     * 判断一个数据是否不存在，是undefined或者null
     * @param       {any} val 要进行判断的数据
     * @return      {boolean} true-不存在 ; false-存在
     * @author     :loulan
     * */
    export const isNotExist = (val: any): boolean => !isExist(val);

    /**
     * 判断数据是否为空。目前判断的类型如下：
     * 字符串【String】
     * 数组【Array】
     * @param       {string|Array<any>} val 要进行判断的数据
     * @return      {boolean} true-为空 ; false-不为空
     * @author     :loulan
     * */
    export const isEmpty = (val: string | Array<any> | null | undefined): boolean => {
        // 如果数据不存在直接返回空
        if (isNotExist(val)) {
            return true;
        }

        // 接下来需要分类型进行判断
        if (is(String, val)) {
            return val!.length <= 0;
        } else if (is(Array, val)) {
            return val!.length <= 0;
        } else {
            // 如果不知道类型的话，那么如果数据存在就确认为不为空
            return false;
        }
    };

    /**
     * 判断数据是否不为为空。目前判断的类型可以查看 isEmpty说明
     * @param       {string|Array<any>} val 要进行判断的数据
     * @return      {boolean} true-不为空 ; false-为空
     * @author     :loulan
     * */
    export const isNotEmpty = (val: string | Array<any> | null | undefined): boolean => !isEmpty(val);
}
