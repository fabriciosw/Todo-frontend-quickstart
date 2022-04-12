/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @description
 * Verificar se o valor de entrada é um número
 * Exemplo de uso:
 * checkIsNumeric('boo12');
 * @param {Any} value
 * @return {Boolean} false
 */

const checkIsNumeric = (value: any): boolean => /^-?\d+$/.test(value);

export default checkIsNumeric;
