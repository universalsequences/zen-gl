
import { memo } from './memo';
import { Context, Arg, UGen, Generated, GLType } from './types';
import { emitType } from './context';

/**
 * Helper function for defining built-in WebGL operators (like +, -, *, etc)
 * 
 * @param operator WebGL operator to use for this operation
 * @param name Human-readable name of the operator (used in variable)
 * @param strictType If given, then we do not infer type & use this type
 * @returns 
 */
const op = (operator: string, name: string, strictType?: GLType) => {
    return (...args: Arg[]): UGen => {
        return memo((context: Context): Generated => {
            // evaluate the nested dependencies for this operation
            let evaluatedArgs: Generated[] = args.map((arg: Arg) => context.gen(arg));

            // ask for a new (distinct) variable name from context
            let [variableName] = context.useVariables(name + "Val");

            // determine type from the arguments (e.g. 5 + vec2(2,5) -> results in a vec2 in WebGL)
            let _type: GLType = strictType === undefined ? emitType(evaluatedArgs) : strictType;
            let type: string = context.printType(_type);

            // construct the core code string for this operation, using the dependent variables 
            let code = `${type} ${variableName} = ${evaluatedArgs.map(x => x.variable).join(operator)};`;

            // emit out all dependencies along with the core code string into a new Generated object
            return context.emit(
                _type,
                code,
                variableName,
                ...evaluatedArgs);
        });
    };
};

/**
 * Helper function for defining built-in WebGL functions (like sin/cos/pow etc)
 * 
 * @param func WebGL function name
 * @param name Human-readable name of the function (used in the variable)
 * @param jsFunc  if given & all arguments are numbers, we use this function to evaluate
 * @param strictType if given, we use this type instead of infering from arguments 
 * @returns 
 */
export const func = (
    func: string,
    name: string = func,
    jsFunc?: (...x: number[]) => number,
    strictType?: GLType) => {
    return (...ins: Arg[]): UGen => {
        return memo((context: Context): Generated => {
            // evaluate the nested dependencies for this operation
            let evaluatedArgs = ins.map(f => context.gen(f));
            
            // ask for new variable name
            let [variableName] = context.useVariables(`${name}Val`);

            // determine the type from the dependencies
            let _type = strictType === undefined ? emitType(evaluatedArgs) : strictType;
            let type = context.printType(_type);

            // if every argument is number, then we simply evaluate it here
            // otherwise, we construct the core code string for 
            let code = ins.length > 0 && jsFunc && ins.every(x => typeof x === "number") ?
                `${type} ${variableName} = ${jsFunc(...ins as number[])};` :
                `${type} ${variableName} = ${func}(${evaluatedArgs.map(x => x.variable).join(",")});`;

            return context.emit(_type, code, variableName, ...evaluatedArgs);
        });
    }
};

export const and = op("&&", "and", GLType.Bool);
export const or = op("||", "or", GLType.Bool);
export const add = op("+", "add");
export const sub = op("-", "sub");
export const mult = op("*", "mult");
export const div = op("/", "div");
export const lt = op("<", "lt", GLType.Bool);
export const gt = op(">", "gt", GLType.Bool);
export const gte = op(">=", "gte", GLType.Bool);
export const lte = op("<=", "lte", GLType.Bool);
export const eq = op("==", "eq", GLType.Bool);
export const pow = func("pow", "pow", Math.pow);
export const atan = func("atan", "atan", Math.atan2);
export const cosh = func("cosh", "cosh", Math.cosh);
export const sinh = func("sinh", "sinh", Math.sinh);
export const floor = func("floor", "floor", Math.floor);
export const ceil = func("ceil", "ceil", Math.ceil);
export const sin = func("sin", "sin", Math.sin);
export const cos = func("cos", "cos", Math.cos);
export const tan = func("tan", "tan", Math.tan);

export const smoothstep = func("smoothstep");
export const step = func("step");
export const mix = func("mix");
export const min = func("min");
export const max = func("max");
export const mod = func("mod");
export const log = func("log");
export const sqrt = func("sqrt");
export const sign = func("sign");
export const normalize = func("normalize");
export const exp = func("exp");
export const cross = func("cross");
export const exp2 = func("exp2");
export const length = func("length", "length", undefined, GLType.Float);
export const abs = func("abs", "abs");
export const fract = func("fract", "fract");


// dot product takes 2 vectors and returns a float
export const dot = func("dot", "dot", undefined, GLType.Float);


