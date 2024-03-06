const Operand = require('./Operand.js');
const Operation = require('./Operation.js');
const Task = require('./Task.js');

class School {
  constructor(courses) {
    this.courses = courses.map((course) => new Course(course));
  }

  findCourseById(id) {
    return this.courses.find((course) => course.id === id) || null;
  }

  printPlan() {
    this.courses.forEach((course) => {
      console.log('[Course]', course.getName());

      course.getSections().forEach((section) => {
        console.log('  [Section]', section.getName());

        section.getTopics().forEach((topic) => {
          console.log('    [Topic]', topic.getName());
        });
        console.log('    [Take EXAM]');
      });

      console.log('\n');
    });
  }
}

class Course {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.sections = config.sections.map(
      (section) => new Section(section, this)
    );
  }

  findSectionById(id) {
    return this.sections.find((section) => section.id === id) || null;
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getSections() {
    return this.sections;
  }
}

class Section {
  constructor(config, course) {
    this.id = config.id;
    this.name = config.name;
    this.topics = config.topics.map((topic) => new Topic(topic, this));

    this.course = course;
  }

  buildExam(numTasksForEachTopic) {
    return this.getTopics().map((topic) =>
      topic.buildTasks(numTasksForEachTopic)
    );
  }

  findTopicById(id) {
    return this.topics.find((topic) => topic.id === id) || null;
  }

  getCourse() {
    return this.course;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getTopics() {
    return this.topics;
  }
}

class Topic {
  #actions;

  constructor(config, section) {
    this.id = config.id;
    this.name = config.name;
    this.#actions = config.actions.map((action) => new Action(action, this));

    this.section = section;
  }

  buildTask() {
    return this.#pickRandom(this.#actions).buildTask();
  }

  buildTasks(numTasks) {
    return [...Array(numTasks)].map(() => this.buildTask());
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getSection() {
    return this.section;
  }

  #pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

class Action {
  constructor(config, topic) {
    this.condition = config.condition;
    this.example = config.example;
    this.operands = config.operands;
    this.operation = new Operation(config.operation);

    this.topic = topic;
  }

  buildTask() {
    let op1 = new Operand(this.operands[0]);
    let op2 = new Operand(this.operands[1]);

    while (!this.condition(op1.val(), op2.val())) {
      op1.rnd();
      op2.rnd();
    }

    return new Task(op1, op2, this.operation, this.topic);
  }
}

module.exports = {
  School,
  Course,
  Section,
  Topic,
  Action,
};
