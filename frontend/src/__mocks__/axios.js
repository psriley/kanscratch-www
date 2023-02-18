/**
 * This is necessary to get jest working. Got the following error on line importing axios
 * Errors: SyntaxError: Cannot use import statement outside a module
*/
import mockAxios from 'jest-mock-axios';
export default mockAxios;