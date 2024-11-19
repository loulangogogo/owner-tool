import { windowsTool } from "../../lib/index";


/**
 * 该自执行匿名函数用于在页面中动态插入一个按钮，并为其添加点击事件监听器
 * 当按钮被点击时，将执行复制文本的操作
 * @author :loulan
 */
(()=>{
  // 通过ID选择器获取页面中的'app'元素，并动态插入HTML结构
  // 这里使用了TypeScript的类型断言来指定元素类型为HTMLDivElement
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = 
  `
    <div>
      <button id="btnCopy">复制文本</button>
    </div>
  `
  
  // 通过ID选择器获取页面中刚插入的'btnCopy'按钮，并为其添加点击事件监听器
  // 同样使用了TypeScript的类型断言来指定元素类型为HTMLButtonElement
  document.querySelector<HTMLButtonElement>('#btnCopy')!.addEventListener('click', () => {
    // 当按钮被点击时，调用windowsTool的copyText方法来复制指定的文本
    // 这里复制的文本是固定的字符串"hello world"
    // 复制操作的结果将被打印到控制台中
    const is = windowsTool.copyText("hello world2");
    console.debug(is);
  })
})();

/**
 * 监视鼠标位置的函数
 * 该函数通过监听窗口的鼠标移动事件，获取并输出当前鼠标的坐标位置
 * 主要用于调试或监控鼠标活动，以便在界面上进行相应的交互设计
 * 
 * @param x 鼠标当前位置的横坐标
 * @param y 鼠标当前位置的纵坐标
 * @return 无返回值
 * @author :loulan
 */
(()=>{
    windowsTool.watchMousePosition((x:number, y:number)=>{
        console.debug(x, y);
    })
});