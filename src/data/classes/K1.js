const Operation = require('../lib/Operation');

// Class > Section > Topic
module.exports = {
  name: 'Pirma klasė',
  id: '100',
  sections: [
    {
      name: 'Sudėtis iki 9',
      id: '110',
      topics: [
        {
          name: 'Sudėtis iki 5',
          id: '111',
          actions: [
            {
              condition: (a, b) => a + b <= 5,
              example: '1 + 1; 1 + 3; 2 + 3; 4 + 1;',
              operands: [
                { min: 1, max: 5 },
                { min: 1, max: 5 },
              ],
              operation: 'ADD',
            },
          ],
        },
        {
          name: 'Sudėtis iki 9',
          id: '112',
          actions: [
            {
              condition: (a, b) => a + b > 5 && a + b <= 9,
              example: '5 + 1; 6 + 3; 4 + 4',
              operands: [
                { min: 1, max: 9 },
                { min: 1, max: 9 },
              ],
              operation: 'ADD',
            },
          ],
        },
      ],
    },
    {
      name: 'Atimtis iki 9',
      id: '120',
      topics: [
        {
          name: 'Atimtis iki 5',
          id: '121',
          actions: [
            {
              condition: (a, b) => a > b,
              example: '5 - 1; 3 - 2; 4 - 3;',
              operands: [
                { min: 2, max: 5 },
                { min: 1, max: 4 },
              ],
              operation: 'SUB',
            },
          ],
        },
        {
          name: 'Atimtis iki 9',
          id: '122',
          actions: [
            {
              condition: (a, b) => a > b,
              example: '7 - 2; 9 - 4; 6 - 3; 8 - 3;',
              operands: [
                { min: 6, max: 9 },
                { min: 1, max: 8 },
              ],
              operation: 'SUB',
            },
          ],
        },
        {
          name: 'Nulis',
          id: '123',
          actions: [
            {
              condition: (a, b) => true,
              example: '4 + 0; 8 + 0; 10 + 0',
              operands: [{ min: 1, max: 10 }, { value: 0 }],
              operation: 'ADD',
            },
            {
              condition: (a, b) => true,
              example: '0 + 1; 0 + 7; 0 + 10',
              operands: [{ value: 0 }, { min: 1, max: 10 }],
              operation: 'ADD',
            },
            {
              condition: (a, b) => true,
              example: '1 - 0; 3 - 0; 10 - 0;',
              operands: [{ min: 1, max: 10 }, { value: 0 }],
              operation: 'SUB',
            },
            {
              condition: (a, b) => a === b,
              example: '1 - 1 = 0; 4 - 4 = 0; 10 - 10 = 0',
              operands: [
                { min: 1, max: 10 },
                { min: 1, max: 10 },
              ],
              operation: 'SUB',
            },
          ],
        },
      ],
    },
    {
      name: 'Sudėtis ir atimtis iki 19',
      id: '130',
      topics: [
        {
          name: 'Sudėtis iki 15',
          id: '131',
          actions: [
            {
              condition: (a, b) => a + b >= 10 && a + b <= 15,
              example: '9 + 2; 9 + 1; 9 + 5; 7 + 4; 6 + 5; ',
              operands: [
                { min: 0, max: 9 },
                { min: 1, max: 9 },
              ],
              operation: 'ADD',
            },
          ],
        },
        {
          name: 'Sudėtis iki 19',
          id: '132',
          actions: [
            {
              condition: (a, b) => a + b <= 19,
              example: '11 + 5; 13 + 3; 14 + 4; 15 + 4; 11 + 6',
              operands: [
                { min: 10, max: 19 },
                { min: 0, max: 9 },
              ],
              operation: 'ADD',
            },
            {
              condition: (a, b) => a + b <= 19,
              example: '8 + 11',
              operands: [
                { min: 0, max: 9 },
                { min: 10, max: 19 },
              ],
              operation: 'ADD',
            },
            {
              condition: (a, b) => a + b > 15 && a + b <= 19,
              example: '9 + 9, 9 + 8; 8 + 8',
              operands: [
                { min: 7, max: 10 },
                { min: 7, max: 10 },
              ],
              operation: 'ADD',
            },
          ],
        },
        {
          name: 'Atimtis iki 15',
          id: '133',
          actions: [
            {
              condition: (a, b) => true,
              example: '12 - 4; 15 - 3; 10 - 5; 15 - 9',
              operands: [
                { min: 10, max: 15 },
                { min: 0, max: 9 },
              ],
              operation: 'SUB',
            },
            {
              condition: (a, b) => a >= b,
              example: '13 - 11; 12 - 12;',
              operands: [
                { min: 10, max: 15 },
                { min: 10, max: 15 },
              ],
              operation: 'SUB',
            },
          ],
        },
        {
          name: 'Atimtis iki 19',
          id: '134',
          actions: [
            {
              condition: (a, b) => true,
              example: '17 - 3; 18 - 5;',
              operands: [
                { min: 16, max: 19 },
                { min: 0, max: 9 },
              ],
              operation: 'SUB',
            },
            {
              condition: (a, b) => a >= b,
              example: '19 - 11, 19 - 18',
              operands: [
                { min: 16, max: 19 },
                { min: 10, max: 19 },
              ],
              operation: 'SUB',
            },
          ],
        },
      ],
    },
    {
      name: 'Sudėtis ir atimtis iki 100',
      id: '140',
      topics: [
        {
          name: 'Dešimčių sudėtis ir atimtis',
          id: '141',
          actions: [
            {
              condition: (a, b) => a + b <= 100,
              example: '20 + 30; 20 + 40; 10 + 50;',
              operands: [
                { oneOf: [10, 20, 30, 40, 50, 60, 70, 80, 90] },
                { oneOf: [10, 20, 30, 40, 50, 60, 70, 80, 90] },
              ],
              operation: 'ADD',
            },
            {
              condition: (a, b) => a >= b,
              example: '60 - 40',
              operands: [
                { oneOf: [10, 20, 30, 40, 50, 60, 70, 80, 90] },
                { oneOf: [10, 20, 30, 40, 50, 60, 70, 80, 90] },
              ],
              operation: 'SUB',
            },
          ],
        },
        {
          name: 'Dviženklio ir vienaženklio skaičių sudėtis',
          id: '142',
          actions: [
            {
              condition: (a, b) => a + b <= 100,
              example:
                '68 + 3; 42 + 6; 48 + 4; 55 + 7; 58 + 2; 44 + 9; 51 + 7;',
              operands: [
                { min: 10, max: 99 },
                { min: 0, max: 9 },
              ],
              operation: 'ADD',
            },
          ],
        },
        {
          name: 'Dviženklio ir vienaženklio skaičių atimtis',
          id: '143',
          actions: [
            {
              condition: (a, b) => true,
              example: '43 - 5; 81 - 5; 78 - 7; 74 - 8; 67 - 4; 51 - 6; 30 - 7',
              operands: [
                { min: 10, max: 99 },
                { min: 0, max: 9 },
              ],
              operation: 'SUB',
            },
          ],
        },
        {
          name: 'Dviženklių skaičių sudėtis ir atimtis',
          id: '144',
          actions: [
            {
              condition: (a, b) =>
                a + b <= 100 && !Operation.requiresCarrying(a, b),
              example: '52 + 23; 25 + 53; 31 + 68;',
              operands: [
                { min: 10, max: 99 },
                { min: 10, max: 99 },
              ],
              operation: 'ADD',
            },
            {
              condition: (a, b) => a >= b && !Operation.requiresBorrowing(a, b),
              example: '76 - 34; 86 - 34; 67 - 25, 87 - 15',
              operands: [
                { min: 10, max: 99 },
                { min: 10, max: 99 },
              ],
              operation: 'SUB',
            },
          ],
        },
      ],
    },
  ],
};
