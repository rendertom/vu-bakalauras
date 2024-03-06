const k1 = require('./classes/K1.js');
const k2 = require('./classes/K2.js');
const k3 = require('./classes/K3.js');
const k4 = require('./classes/K4.js');

const { School, Course, Section, Topic, Action } = require('./lib/School.js');

const school = new School([k1, k2, k3, k4]);

export default school;
