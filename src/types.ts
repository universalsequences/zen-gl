import { Uniform } from './uniforms';
import { Argument } from './functions';
/**
 * zen-gl takes the same approach as zen to compile
 * expressions into GL (but potentially other shader langauges like metal/webgpu)
 */

export type EmittedVariables = {
    [key: string]: boolean;
};

export type Error = string;

export type ChildContext = Context & {
    parentContext: Context
}

export interface Context {
    idx: number;
    emittedVariables: EmittedVariables;
    gen: (input: Arg) => Generated;
    isVariableEmitted: (variable: string) => boolean;
    useVariables: (...names: string[]) => string[];
    printType: (x: GLType) => string;
    emit: (type: GLType, code: string, variable: string, ...args: Generated[]) => Generated;
    emitError: (error: Error) => void;
    errors: Error[];
    webGLRenderingContext: WebGLRenderingContext | null;
    webGLProgram: WebGLProgram | null;
    uniforms: Uniform[];
    initializeUniforms: () => void;
}

export enum GLType {
    Float,
    Vec2,
    Vec3,
    Vec4,
    Sampler2D,
    Function
}

export const stringToType = (type: string): GLType => {
    if (type === "float") {
        return GLType.Float;
    } else if (type === "vec2") {
        return GLType.Vec2;
    } else if (type === "vec3") {
        return GLType.Vec3;
    } else if (type === "vec4") {
        return GLType.Vec4;
    } else {
        return GLType.Sampler2D;
    }
};

export interface UniformDefinition {
    type: GLType;
    name: string;
}

export interface Generated {
    code: string; /*  the code generated */
    variable?: string; /* the current variable */
    variables?: string[]; /* all variables */
    uniforms?: UniformDefinition[]; /* all uniforms */
    functions?: Generated[]; /* functions defined throughtout */
    functionArguments?: Argument[]; /* any arguments */
    context?: Context;
    type: GLType;
}

export type Arg = number | UGen;
export type UGen = (context: Context) => Generated;
