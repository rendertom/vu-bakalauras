// const OpsADD = require('./OpsADD');
// const OpsSUB = require('./OpsSUB');
// const OpsMUL = require('./OpsMUL');
// const OpsDIV = require('./OpsDIV');

class Operation {
  /** @param {string} operation one of 'ADD', 'SUB', 'MUL', 'DIV' */
  constructor(operation) {
    operation = operation.toUpperCase();
    if (!['ADD', 'SUB', 'MUL', 'DIV'].includes(operation)) {
      throw new Error(`Unsupported operation ${operation}`);
    }

    this.operation = operation;
  }

  /**
   * @param {number} number1 first operand
   * @param {number} number2 second operand
   * @returns {number} result of two operands
   * @throws
   */
  calculate(number1, number2) {
    if (this.isAdd()) return number1 + number2;
    if (this.isMul()) return number1 * number2;
    if (this.isSub()) return number1 - number2;
    if (this.isDiv()) {
      if (number2 === 0) throw new Error('Division by zero');
      return number1 / number2;
    }
  }

  // getMath = () => {
  //   if (this.isAdd()) return OpsADD;
  //   if (this.isSub()) return OpsSUB;
  //   if (this.isMul()) return OpsMUL;
  //   if (this.isDiv()) return OpsDIV;
  // }

  /** @returns {string} */
  getName() { return this.operation; }

  isAdd() { return this.operation === 'ADD'; }
  isSub() { return this.operation === 'SUB'; }
  isMul() { return this.operation === 'MUL'; }
  isDiv() { return this.operation === 'DIV'; }

  toSign() {
    if (this.isAdd()) return '+';
    if (this.isSub()) return '-';
    if (this.isMul()) return '*';
    if (this.isDiv()) return '/';
  }

  static requiresBorrowing = (num1, num2) => {
    if (num1 < num2) return true;
    const digits1 = num1.toString().split('').reverse();
    const digits2 = num2.toString().split('').reverse();
    for (let i = 0; i < Math.min(digits1.length, digits2.length); i++) {
      const next = digits1[i + 1];
      if (next && next > 1 && parseInt(digits1[i], 10) < parseInt(digits2[i], 10)) return true;
    }
    return false;
  }

  static requiresCarrying = (num1, num2) => {
    const digits1 = num1.toString().split('').reverse();
    const digits2 = num2.toString().split('').reverse();
    for (let i = 0; i < Math.min(digits1.length, digits2.length); i++) {
      if (parseInt(digits1[i], 10) + parseInt(digits2[i], 10) >= 10) return true;
    }
    return false;
  }

  static requiresCarryingAt = (num1, num2, index) => {
    const digits1 = num1.toString().split('').reverse();
    const digits2 = num2.toString().split('').reverse();
    if (digits1.length - 1 < index || digits2.length - 1 < index) return false;

    return parseInt(digits1[index], 10) + parseInt(digits2[index], 10) >= 10;
  }

  static requiresCarryingMult = (num1, num2) => {
    const digits1 = num1.toString().split('').reverse();
    const digits2 = num2.toString().split('').reverse();
    for (let i = 0; i < Math.min(digits1.length, digits2.length); i++) {
      if (parseInt(digits1[i], 10) * parseInt(digits2[i], 10) >= 10) return true;
    }
    return false;
  }

  static containsNumberInside(number1, number2) {
    const hay = number1.toString();
    const needle = number2.toString();
  
    if (hay.length <= 2 || (hay.length - needle.length === 0)) return false;
    return hay.substring(1, hay.length - 1).includes(needle);
  }
}

module.exports = Operation;