import { Generated, UGen, Context, UniformDefinition } from './types';
import { ContextImpl } from './context';

export interface ZenGraph {
    code: string;
    context: Context;
}

export const zen = (input: UGen): ZenGraph => {
    let context: Context = new ContextImpl();
    let out: Generated = context.gen(input);
    console.log("generated", out);

    let mainCode = out.code;
    mainCode += `
gl_FragColor = ${out.variable}; `;

    let uniforms = "";
    if (out.uniforms) {
        for (let uniform of out.uniforms) {
            uniforms += `
uniform ${context.printType(uniform.type)} ${uniform.name};
`
        }
    }
    let functions = "";
    if (out.functions) {
        for (let fn of out.functions) {
            functions += printFunction(context, fn);
        }
    }
    let shaderCode = `
precision mediump float;
uniform vec2 resolution;
${uniforms}

${functions}

void main() {
${mainCode.split("\n").map(x => "    " + x).join("\n")}
}
`;

    return {
        code: shaderCode,
        context,
    };
};

const printFunction = (context: Context, fn: Generated): string => {
    let code = `${context.printType(fn.type)} ${fn.variable}(`;
    if (fn.functionArguments) {
        code += fn.functionArguments.sort((a, b) => a.num - b.num).map(arg => `${context.printType(arg.type)} ${arg.name}`).join(",");
    }
    code += `) {
${fn.code}
}
`
    return code;
}
