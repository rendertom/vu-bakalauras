class Operand {
  constructor(config) {
    const { min, max, oneOf, value: constant } = config;
    this.min = min;
    this.max = max;
    this.oneOf = oneOf;
    this.constant = constant;

    this.rnd();
  }

  rnd() {
    if (typeof this.oneOf !== 'undefined') {
      this.value = this.#pickRandom();
    } else if (typeof this.min !== 'undefined' && typeof this.max !== 'undefined') {
      this.value = this.#randomIntInclusive();
    } else if (typeof this.constant !== 'undefined') {
      this.value = this.constant;
    } else {
      throw new Error('Could not set value in Operand');
    }
  }

  val() {
    return this.value;
  }

  #pickRandom() {
    const array = this.oneOf;
    return array[Math.floor(Math.random() * array.length)]
  };

  #randomIntInclusive() {
    const min = this.min;
    const max = this.max;
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
  }
}

module.exports = Operand;
