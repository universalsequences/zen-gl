import { generateShader } from "../src/shader";
import { vec4, add, mult, uniform, GLType } from "../src/index";
import { ContextImpl } from "../src/context";

test("fragment shader generation", () => {
    let context = new ContextImpl();
    let color = vec4(.5,0,0,1);
    let generated = add(
        color,
        .1)(context);

    let shader = generateShader(generated, context, "gl_FragColor", []);

    expect(shader).toBe(`
precision mediump float;
uniform vec2 resolution;






void main() {
    
    vec4 vectorVal0 = vec4 (0.5,0.0,0.0,1.0);
    vec4 addVal1 = vectorVal0+0.1;
    gl_FragColor = addVal1; 

}
`);
    
    
})

test("fragment shader with uniforms", () => {
    let context = new ContextImpl();
    let uni = uniform(GLType.Float, 1);
    let color = vec4(.5,0,0,1);
    let generated = mult(
        color,
        uni())(context);

    let shader = generateShader(generated, context, "gl_FragColor", []);

    expect(shader).toBe(`
precision mediump float;
uniform vec2 resolution;

uniform float uniform_01;






void main() {
    
    vec4 vectorVal0 = vec4 (0.5,0.0,0.0,1.0);
    
    vec4 multVal2 = vectorVal0*uniform_01;
    gl_FragColor = multVal2; 

}
`);
    
    
})