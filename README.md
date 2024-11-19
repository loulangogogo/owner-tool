# owner-tool-js

&emsp;&emsp;owner-tool-js是js工具包，内部包含各种js常用工具方法【并在不断的更新】。如有问题
请在[github的issue](https://github.com/loulangogogo/owner-tool/issues) 提出说明；

&emsp;&emsp;**_如果您有好的方法也可以直接在上面提出，并注明您的邮箱。_**

## 版本说明
&emsp;&emsp;该工具方法有一个比较大的版本跳跃，是因为版本的改动比较大，无法和先前的版本进行兼容，
所以进行了版本号的大变动。

&emsp;&emsp;0.1.0之前的版本采用的是js代码直接写的源码方法，所有的方法都在一个包下，使用的时候需要
面对大量的方法查看选择。并且没有ts代码声明，无法在ts中直接导入使用。

&emsp;&emsp;2.0.0之后的版本采用的是ts代码写的源码，并且对不同功能的方法进行了命名空间的区分，使用
的时候更加的方便，打包之后带有ts声明，可以直接在ts代码中引入使用。

&emsp;&emsp;3.0.0之后的版本采用的依旧是ts进行打包的，支持ts开发使用，3.0.0之后主要是对文件位置以及形式进行了调整，不影响从2.0.0之后的更新使用。

## 工具包说明（命名空间）
>具体的方法说明请进入方法定义文件查看
- ### core 核心基础包
```ts
import * as $L from 'owner-tool-js';
import {coreTool} from 'owner-tool-js';

let data = undefined;
$L.core.isEmpty(data);
coreTool.isEmpty(data);
```

- ### arrayTool 数组工具包
```ts
import * as $L from 'owner-tool-js';
import {arrayTool} from 'owner-tool-js';

let arr = [
    {
        "id": "1",
        "pid": "-1",
        "name": "1"
    }, {
        "id": "2",
        "pid": "1",
        "name": "2"
    }, {
        "id": "3",
        "pid": "1",
        "name": "3"
    }, {
        "id": "4",
        "pid": "3",
        "name": "4"
    }
];

let arrayToTree = $L.arrayTool.arrayToTree(arr, "id", "pid", "-1");

let arrayToTree2 = arrayTool.arrayToTree(arr, "id", "pid", "-1");
```

- ### functionTool 函数方法工具包
```ts
import * as $L from 'owner-tool-js';
import {functionTool} from 'owner-tool-js';

let data1 = {
    a: 1,
    b: "2",
    f:{
        a: 9
    }
};
let data2 = [
    1, 2, 3, "4"
];
let copy1 = $L.functionTool.deepCopy(data1);
let copy2 = $L.functionTool.deepCopy(data2);
```

- ### numberTool 数字类型工具包
```ts
import * as $L from 'owner-tool-js';

$L.numberTool.formatNumber("123456.789456b",2);
$L.numberTool.formatNumber(123456.789456,2);
$L.numberTool.formatNumber(123456.789456e2,2);
$L.numberTool.formatNumber(123456.789456e15,2);
```

- ### stringTool 字符串工具包
```ts
import * as $L from 'owner-tool-js';

let s = $L.stringTool.underlineToCamel("ae_bh_cf_dg");
```

- ### windowsTool 浏览器工具包
```ts
// 这个工具包的方法主要是对浏览器的操作，如获取监听浏览器的高度宽度，滚动条的位置，以及cookie，localStorage,SessionStorage等
import * as $L from 'owner-tool-js';

$L.windowsTool.cookieTool.set("mycookie", "牛逼");
$L.windowsTool.fullScreen(this.$refs.testDiv);
$L.windowsTool.setScrollPosition(0, 0, this.$refs.testDiv);
```
