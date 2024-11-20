import { describe, it, expect } from 'vitest';
import { coreTool } from '../lib/index';

describe('coreTool', () => {
    it('justtest', () => {
        let a: unknown = 30;
        let b = a === 10;
        let c = a + 10;
        if (typeof a === 'number') {
            let c = a + 10;
        }
    });
})