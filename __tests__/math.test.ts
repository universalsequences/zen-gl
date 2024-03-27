import { add, mult } from '../src/math';
import { ContextImpl } from '../src/context';

test('basic arithmetic', () => {
    let context = new ContextImpl();
    let generated = add(1,2)(context);
    expect(generated.code).toBe(`
float addVal0 = 1.0+2.0;`);
});

test('nested arithmetic', () => {
    let context = new ContextImpl();
    let generated = add(1,mult(2, 3))(context);
    expect(generated.code).toBe(`
float multVal0 = 2.0*3.0;
float addVal1 = 1.0+multVal0;`);

});