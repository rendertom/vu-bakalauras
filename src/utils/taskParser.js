import operationTypes from "../config/operationTypes";

export default taskParser = {
  countByType(tasks, type) {
    return tasks.reduce((accum, task) => {
      return task.type === type ? accum + 1 : accum;
    }, 0);
  },

  countCorrect(tasks) {
    return tasks.reduce((accum, task) => {
      return task.isCorrect ? accum + 1 : accum;
    }, 0);
  },

  countCorrectByType(tasks, type) {
    return tasks.reduce((accum, task) => {
      return task.isCorrect && task.type === type ? accum + 1 : accum;
    }, 0);
  },

  getGeneralStats(tasks) {
    const count = tasks.length;
    const numCorrect = this.countCorrect(tasks);
    const numIncorrect = count - numCorrect;
    const score = (numCorrect / count) * 100 || 0;

    return {
      count,
      numCorrect,
      numIncorrect,
      score,
    };
  },

  getStats(tasks) {
    return {
      additions: this.getStatsByType(tasks, operationTypes.ADDITION),
      divisions: this.getStatsByType(tasks, operationTypes.DIVISION),
      general: this.getGeneralStats(tasks),
      multiplications: this.getStatsByType(
        tasks,
        operationTypes.MULTIPLICATION
      ),
      subtractions: this.getStatsByType(tasks, operationTypes.SUBTRACTION),
    };
  },

  getStatsByType(tasks, type) {
    const count = this.countByType(tasks, type);
    const numCorrect = this.countCorrectByType(tasks, type);
    const numIncorrect = count - numCorrect;
    const score = (numCorrect / count) * 100 || 0;

    return {
      count,
      numCorrect,
      numIncorrect,
      score,
    };
  },
};
