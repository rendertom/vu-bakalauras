import icons from './icons';
import operationSigns from './operationSigns';
import operationTypes from './operationTypes';

const challenges = [
  {
    selected: true,
    solve: 'C',
    title: 'A + B = ?',
    subtitle: 'tasks.solveC',
  },
  {
    selected: false,
    solve: 'B',
    title: 'A + ? = C',
    subtitle: 'tasks.solveB',
  },
  {
    selected: false,
    solve: 'A',
    title: '? + B = C',
    subtitle: 'tasks.solveA',
  },
];

const numDigits1 = [
  {
    selected: true,
    subtitle: 'numDigits.one',
    title: '0 - 9',
    value: 1,
  },
  {
    selected: false,
    subtitle: 'numDigits.two',
    title: '10 - 99',
    value: 2,
  },
  {
    selected: false,
    subtitle: 'numDigits.three',
    title: '100 - 999',
    value: 3,
  },
  {
    selected: false,
    subtitle: 'numDigits.four',
    title: '1000 - ...',
    value: 4,
  },
];

const numDigits2 = [
  {
    selected: true,
    subtitle: 'numDigits.one',
    title: '0 - 9',
    value: 1,
  },
  {
    selected: false,
    subtitle: 'numDigits.two',
    title: '10 - 99',
    value: 2,
  },
  {
    selected: false,
    subtitle: 'numDigits.three',
    title: '100 - 999',
    value: 3,
  },
  {
    selected: false,
    subtitle: 'numDigits.four',
    title: '1000 - ...',
    value: 4,
  },
];

const numTasks = [
  {
    selected: true,
    subtitle: 'numTasks.ten',
    title: '10',
  },
  {
    selected: false,
    subtitle: 'numTasks.twenty',
    title: '20',
  },
  {
    selected: false,
    subtitle: 'numTasks.fifty',
    title: '50',
  },
  {
    selected: false,
    subtitle: 'numTasks.hundred',
    title: '100',
  },
];

const operations = [
  {
    icon: icons.addition,
    selected: true,
    sign: operationSigns.ADDITION,
    subtitle: 'operations.addition',
    type: operationTypes.ADDITION,
  },
  {
    icon: icons.subtraction,
    selected: false,
    sign: operationSigns.SUBTRACTION,
    subtitle: 'operations.subtraction',
    type: operationTypes.SUBTRACTION,
  },
  {
    icon: icons.multiplication,
    selected: false,
    sign: operationSigns.MULTIPLICATION,
    subtitle: 'operations.multiplication',
    type: operationTypes.MULTIPLICATION,
  },
  {
    icon: icons.division,
    selected: false,
    sign: operationSigns.DIVISION,
    subtitle: 'operations.division',
    type: operationTypes.DIVISION,
  },
];

export default {
  challenges,
  numDigits1,
  numDigits2,
  numTasks,
  operations,
};
