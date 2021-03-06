const _public = {};

_public.stringifyFunctions = object => {
  return handleObjectAttributes(object, functionToString, isFunction);
};

_public.parseFunctions = object => {
  return handleObjectAttributes(object, stringToFunction, isStringifiedFunction);
};

function handleObjectAttributes(object, handler, shouldHandle){
  if(!isObject(object))
    return object;
  Object.keys(object).forEach(key => {
    object[key] = handleVariableAccordingType(object[key], handler, shouldHandle);
  });
  return object;
}

function functionToString(fn){
  return fn.toString();
}

function stringToFunction(string){
  const expression = startsWithFunctionWord(string) ? string : `function ${string}`;
  return eval(`(${expression})`);
}

function handleVariableAccordingType(variable, handler, shouldHandle){
  return typeof variable == 'object' ?
    handleObjectVariableAccordingType(variable, handler, shouldHandle) :
    handleNonObjectVariableAccordingType(variable, handler, shouldHandle);
}

function handleNonObjectVariableAccordingType(variable, handler, shouldHandle){
  return shouldHandle(variable) ? handler(variable) : variable;
}

function handleObjectVariableAccordingType(variable, handler, shouldHandle){
  if(isArray(variable))
    return stringifyFunctionsInArray(variable, handler, shouldHandle);
  return handleObjectAttributes(variable, handler, shouldHandle);
}

function stringifyFunctionsInArray(array, handler, shouldHandle){
  array.forEach((item, index) => {
    array[index] = handleVariableAccordingType(item, handler, shouldHandle);
  });
  return array;
}

function isFunction(value){
  return typeof value == 'function';
}

function isString(value){
  return value && typeof value == 'string';
}

function isStringifiedFunction(value){
  return isString(value) &&
    (startsWithFunctionWord(value) || isStringifiedShorthandedFunction(value));
}

function startsWithFunctionWord(string){
  return string.indexOf('function') === 0;
}

function isStringifiedShorthandedFunction(string){
  const regex = new RegExp(/^(\w+)\((.*)\)\s?\{/);
  return regex.test(string);
}

function isArray(value){
  return Array.isArray(value);
}

function isObject(value){
  return value && typeof value == 'object' && value.constructor.name == 'Object';
}

module.exports = _public;
