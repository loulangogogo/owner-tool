import {core as $core} from './core';

/*********************************************************
 ** number操作工具
 ** <br><br>
 ** Date: Created in 2022/8/9 15:10
 ** @author loulan
 ** @version 0.0.0
 *********************************************************/
export namespace numberTool {
    /**
     * 判断数据是否是数值类型的
     * @param       {any} val 要进行判断的数据
     * @return      {boolean} true-是 ; false-否
     * @author     :loulan
     * */
    export const isNumber = (val: any): boolean => !isNaN(parseFloat(val)) && isFinite(val);

    /**
     * 格式化数字的显示方式。如： 12,123,233.89(如果数字位数大于16位可能会丢失精度，Number存储最大之有关系)
     * @param       {number|string}number：要格式化的数字
     * @param       {number}decimals：保留几位小数
     * @return      {string}格式化后的数字展示
     * @author     :loulan
     * */
    export const formatNumber = (number: number | string, decimals: number): string => {
        // 将数据中不属于数字的替换掉
        let newNum = parseFloat((number + '').replace(/[^0-9+-Ee.]/g, ''));

        let n = !isFinite(+newNum) ? 0 : +newNum;
        let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);

        // 这个方法进行精度的四舍五入计算保留
        const toFixedFix = (n:number, prec:number) => {
            let k = Math.pow(10, prec);
            return '' + Math.ceil(n * k) / k;
        };

        // 分割符号
        const sep = ",", dec = ".";
        // 如果精度不是0那么进行进度计算，如果是0直接对整数位进行四舍五入
        let s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        // 这个正则表达式用来捕获三位数字，准备添加逗号
        const regex = /(-?\d+)(\d{3})/;
        while (regex.test(s[0])) {
            // 判断捕获的正则表达式中间添加逗号
            s[0] = s[0].replace(regex, "$1" + sep + "$2");
        }

        // 如果小数部分的长度小于精度，那么需要补0
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }

    /**
     * 阿拉伯数字转换大写
     * @param       {string} money 数字转金额转汉字
     * @return      {string} 数字大写汉字
     * @author     :loulan
     * */
    export const moneyParseChina = (money: string):string => {
        //汉字的数字
        const cnNums:Array<string> = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        //基本单位
        const cnIntRadice:Array<string> = ['', '拾', '佰', '仟'];
        //对应整数部分扩展单位
        const cnIntUnits:Array<string> = ['', '万', '亿', '兆'];
        //对应小数部分单位
        const cnDecUnits:Array<string> = ['角', '分', '毫', '厘'];
        //整数金额时后面跟的字符
        const cnInteger:string = '整';
        //整型完以后的单位
        const cnIntLast:string = '圆';
        //最大处理的数字
        const maxNum:number = 999999999999999.9999;
        //金额整数部分
        let integerNum:string;
        //金额小数部分
        let decimalNum:string;
        //输出的中文金额字符串
        let chineseStr:string = '';

        // 如果数据不存在，直接返回空
        if ($core.isNotExist(money)) {
            return '';
        }

        // 判断是否超出最大数据
        const moneyNum:number = parseFloat(money);
        if (moneyNum >= maxNum) {
            //超出最大处理数字
            throw new Error("数字太大！");
        }
        if (moneyNum  == 0) {
            chineseStr = cnNums[0] + cnIntLast + cnInteger;
            return chineseStr;
        }
        //转换为字符串

        if (money.indexOf(".") < 0) {
            integerNum = money;
            decimalNum = "";
        } else {
            const parts:Array<string> = money.split('.');
            integerNum = parts[0];
            decimalNum = parts[1].substr(0, 4);
        }
        //获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
            let zeroCount:number = 0;
            const IntLen = integerNum.length;
            for (let i = 0; i < IntLen; i++) {
                let n:string = integerNum.substr(i, 1);
                let p:number = IntLen - i - 1;
                let q:number = p / 4;
                let m:number = p % 4;
                if (n == '0') {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        chineseStr += cnNums[0];
                    } else {
                        //归零
                        zeroCount = 0;
                        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                    }
                }
                if (m == 0 && zeroCount < 4) {
                    chineseStr += cnIntUnits[q];
                }
            }
            chineseStr += cnIntLast;
        }
        //小数部分
        if ($core.isExist(decimalNum)) {
            const decLen:number = decimalNum.length;
            for (let i:number = 0; i < decLen; i++) {
                let n:string = decimalNum.substr(i, 1);
                if (n != '0') {
                    chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                }
            }
        }
        if (chineseStr == '') {
            chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
            chineseStr += cnInteger;
        }
        return chineseStr;
    }

}
