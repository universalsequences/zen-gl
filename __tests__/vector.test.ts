import { vec4, add, mult } from '../src/index';
import { ContextImpl } from '../src/context';

test('basic vector', () => {
    let context = new ContextImpl();
    let generated = vec4(1,0,0,1)(context);
    expect(generated.code).toBe(`
vec4 vectorVal0 = vec4 (1.0,0.0,0.0,1.0);`);
});

test('vector extraction', () => {
    let context = new ContextImpl();
    let {x,y,z,w} = vec4(1,0,0,1);
    let generated = x(context);
    expect(generated.code).toBe(`
vec4 vectorVal0 = vec4 (1.0,0.0,0.0,1.0);
float xVal1 = vectorVal0.x;`);
});

test('vector extraction sum', () => {
    let context = new ContextImpl();
    let color = vec4(1,0,0,1);
    let generated = add(
        color.x, 
        color.y)(context);

    expect(generated.code).toBe(`
vec4 vectorVal0 = vec4 (1.0,0.0,0.0,1.0);
float xVal1 = vectorVal0.x;
float yVal2 = vectorVal0.y;
float addVal3 = xVal1+yVal2;`);
});

test('vector + float addition (type inference)', () => {
    let context = new ContextImpl();
    let color = vec4(.5,0,0,1);
    let generated = add(
        color,
        .1)(context);

    expect(generated.code).toBe(`
vec4 vectorVal0 = vec4 (0.5,0.0,0.0,1.0);
vec4 addVal1 = vectorVal0+0.1;`);


});