import { describe, it, expect } from 'vitest';
import {numberTool} from "../lib/index"

describe('numberTool', () => {
    it('moneyParseChina1', () => {
        const data:string = numberTool.moneyParseChina('123456789');
        console.debug("123456789="+data);
    });
    it('moneyParseChina2', () => {
        const data:string = numberTool.moneyParseChina('123456.789');
        console.debug("123456789="+data);
    });
    it('moneyParseChina3', () => {
        const data:string = numberTool.moneyParseChina('1234.56789');
        console.debug("1234.56789="+data);
    });
});