class Task {
  constructor(op1, op2, operation, topic) {
    this.op1 = op1;
    this.op2 = op2;
    this.operation = operation;
    this.topic = topic;

    // START: Using this style to match the old format
    this.sign = operation.toSign();
    this.solve = 'C';
    this.values = {
      A: op1.val(),
      B: op2.val(),
      C: operation.calculate(op1.val(), op2.val()),
    };

    this.correctAnswer = undefined;
    this.isCorrect = undefined;
    this.userInput = undefined;
    // END
  }

  buildQuestion() {
    return `${this.op1.val()} ${this.operation.toSign()} ${this.op2.val()} = ${
      this.values.C
    }`;
  }
}

module.exports = Task;
