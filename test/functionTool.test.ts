import { describe, it, expect } from 'vitest';
import {functionTool} from "../lib/index"

describe('functionTool', () => {
  // 测试深度复制功能
  it("deepCopy",()=>{
    
    const obj = {
      name: 'test',
      age: 18,
      sex: 'male'
    };
    console.error(Object.prototype.toString.call([]))
    const objCopy = functionTool.deepCopy(obj);
    expect(objCopy==obj).toBe(false);
    expect(JSON.stringify(objCopy)==JSON.stringify(obj)).toBe(true);
  });
});