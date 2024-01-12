import { ChildContext, UniformDefinition, UGen, Context, Generated, GLType } from './types';
import { memo } from './memo';

/**
 * handle uniforms similar to params in zen
 */

export type Data = number | number[];
export type Uniform = (() => UGen) & {
    set?: (v?: Data) => void,
}

export const uniform = (type: GLType, val: number): Uniform => {
    let contexts: Context[] = [];
    let uniformDefinition: UniformDefinition;
    let lastValue: Data = val;

    let _uniform: Uniform = (): UGen => {
        return memo((context: Context): Generated => {
            let _context = context;
            while ((_context as ChildContext).parentContext) {
                _context = (_context as ChildContext).parentContext;
            }
            contexts.push(_context);
            let [uniformName] = context.useVariables("uniform");
            uniformDefinition = {
                name: uniformName,
                type
            };

            let generated: Generated = context.emit(
                type, "", uniformName);
            if (!generated.uniforms) {
                generated.uniforms = [];
            }
            generated.uniforms.push(uniformDefinition);
            context.uniforms.push(_uniform);
            if ((context as ChildContext).parentContext) {
                (context as ChildContext).parentContext.uniforms.push(_uniform);
            }
            return generated;
        });
    };

    _uniform.set = (v: Data = lastValue) => {
        lastValue = v;
        if (uniformDefinition) {
            // todo: utilize context (once compiled) to send data to shader via uniforms
            for (let context of contexts) {
                let gl = context.webGLRenderingContext;
                let program = context.webGLProgram;
                if (gl && program) {
                    let uLocation = gl.getUniformLocation(program, uniformDefinition.name);
                    gl.uniform1f(uLocation, v as number);
                    console.log('setting uni=%s -> %s in context', uniformDefinition.name, v, context);
                } else {
                    console.log("no gl / program for uniform", uniformDefinition.name);
                }
            }
        }
    };

    return _uniform;
}

