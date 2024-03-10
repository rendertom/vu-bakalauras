import operationTypes from "../config/operationTypes";
import rnd from "./rnd";

export default taskBuilder = {
  buildTask(config) {
    const operation = rnd.getFromArray(
      config.operations.filter((item) => item.selected)
    );

    const sign = operation.sign;
    const operationType = operation.type;

    const numDigits1 = rnd.getFromArray(
      config.numDigits1.filter((item) => item.selected)
    ).value;

    const numDigits2 = rnd.getFromArray(
      config.numDigits2.filter((item) => item.selected)
    ).value;

    const solve = rnd.getFromArray(
      config.challenges.filter((item) => item.selected)
    ).solve;

    const value1 = rnd.getIntWithLength(numDigits1);
    const value2 = rnd.getIntWithLength(numDigits2);

    let valueA, valueB, valueC;

    if (solve === "C") {
      if (operationType === operationTypes.ADDITION) {
        valueA = value1;
        valueB = value2;
        valueC = valueA + valueB;
      } else if (operationType === operationTypes.SUBTRACTION) {
        valueA = Math.max(value1, value2);
        valueB = Math.min(value1, value2);
        valueC = valueA - valueB;
      } else if (operationType === operationTypes.MULTIPLICATION) {
        valueA = value1;
        valueB = value2;
        valueC = valueA * valueB;
      } else if (operationType === operationTypes.DIVISION) {
        valueA = Math.max(value1, value2);
        valueB = Math.min(value1, value2);
        valueC = valueA / valueB;

        if (!Number.isInteger(valueC)) {
          valueC = Math.round(valueC);
          valueA = valueB * valueC;
        }
      }
    } else if (solve === "B") {
      if (operationType === operationTypes.ADDITION) {
        valueC = Math.max(value1, value2);
        valueA = Math.min(value1, value2);
        valueB = valueC - valueA;
      } else if (operationType === operationTypes.SUBTRACTION) {
        valueA = Math.max(value1, value2);
        valueC = Math.min(value1, value2);
        valueB = valueA - valueC;
      } else if (operationType === operationTypes.DIVISION) {
        valueA = Math.max(value1, value2);
        valueC = Math.min(value1, value2);
        valueB = valueA / valueC;

        if (!Number.isInteger(valueB)) {
          valueB = Math.round(valueB);
          valueA = valueB * valueC;
        }
      } else if (operationType === operationTypes.MULTIPLICATION) {
        valueC = Math.max(value1, value2);
        valueA = Math.min(value1, value2);
        valueB = valueC / valueA;

        if (!Number.isInteger(valueB)) {
          valueB = Math.round(valueB);
          valueC = valueA * valueB;
        }
      }
    } else if (solve === "A") {
      if (operationType === operationTypes.ADDITION) {
        valueB = Math.min(value1, value2);
        valueC = Math.max(value1, value2);
        valueA = valueC - valueB;
      } else if (operationType === operationTypes.SUBTRACTION) {
        valueB = Math.max(value1, value2);
        valueC = Math.min(value1, value2);
        valueA = valueC + valueB;
      } else if (operationType === operationTypes.MULTIPLICATION) {
        valueB = Math.min(value1, value2);
        valueC = Math.max(value1, value2);
        valueA = valueC / valueB;

        if (!Number.isInteger(valueA)) {
          valueA = Math.round(valueA);
          valueC = valueA * valueB;
        }
      } else if (operationType === operationTypes.DIVISION) {
        valueB = Math.max(value1, value2);
        valueC = Math.min(value1, value2);
        valueA = valueC * valueB;
      }
    }

    const task = {
      sign,
      solve,
      type: operationType,
      values: {
        A: valueA,
        B: valueB,
        C: valueC,
      },
    };

    return task;
  },

  buildTasks(config) {
    const length = parseInt(
      config.numTasks.find((item) => item.selected).title
    );
    const tasks = [];
    for (var i = 0; i < length; i++) {
      const task = this.buildTask(config);
      tasks.push(task);
    }
    return tasks;
  },
};
