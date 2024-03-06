const Operation = require('../lib/Operation');

module.exports = {
  name: 'Antra klasė',
  id: '200',
  sections: [
    {
      name: 'Sudėtis ir atimtis iki 100',
      id: '210',
      topics: [
        {
          name: 'Dviženklio ir vienaženklio skaičių sudėtis',
          id: '211',
          actions: [
            {
              condition: (a, b) => a + b <= 100,
              example:
                '18 + 4; 57 + 6; 68 + 5; 44 + 9; 39 + 1; 19 + 4; 75 + 8;',
              operands: [
                { min: 10, max: 99 },
                { min: 0, max: 9 },
              ],
              operation: 'ADD',
            },
          ],
        },
        {
          name: 'Dviženklių skaičių sudėtis, kai susidaro nauja dešimtis',
          id: '212',
          actions: [
            {
              condition: (a, b) =>
                a + b <= 100 && Operation.requiresCarrying(a, b),
              example:
                '28 + 12; 24 + 19; 63 + 18; 46 + 46; 58 + 23; 17 + 13 = 30; 63 + 18 = 81',
              operands: [
                { min: 10, max: 99 },
                { min: 10, max: 99 },
              ],
              operation: 'ADD',
            },
          ],
        },
        {
          name: 'Vienaženklio skaičiaus atimtis iš pilnų dešimčių',
          id: '213',
          actions: [
            {
              condition: (a, b) => true,
              example:
                '40 - 6; 50 - 5; 20 - 6; 70 - 1; 60 - 7; 30 - 8; 90 - 2; 80 - 9;',
              operands: [
                { oneOf: [10, 20, 30, 40, 50, 60, 70, 80, 90] },
                { min: 1, max: 9 },
              ],
              operation: 'SUB',
            },
          ],
        },
        {
          name: 'Vienaženklio skaičiaus atimtis išardant dešimtį',
          id: '214',
          actions: [
            {
              condition: (a, b) =>
                a % 10 !== 0 && Operation.requiresBorrowing(a, b),
              example:
                '72 - 6; 51 - 6; 62 - 4; 53 - 9; 41 - 9; 84 - 7; 73 - 8;',
              operands: [
                { min: 10, max: 99 },
                { min: 1, max: 9 },
              ],
              operation: 'SUB',
            },
          ],
        },
        {
          name: 'Dviženklio skaičiaus atimtis iš pilnų dešimčių',
          id: '215',
          actions: [
            {
              condition: (a, b) => a > b && b % 10 !== 0,
              example:
                '30 - 12; 50 - 43; 20 - 11; 90 - 39; 80 - 54; 60 - 18; 100 - 15; 100 - 67',
              operands: [
                { oneOf: [20, 30, 40, 50, 60, 70, 80, 90, 100] },
                { min: 11, max: 99 },
              ],
              operation: 'SUB',
            },
          ],
        },
        {
          name: 'Dviženklių skaičių atimtis išardant dešimtį',
          id: '216',
          actions: [
            {
              condition: (a, b) =>
                a > b && a % 10 !== 0 && Operation.requiresBorrowing(a, b),
              example:
                '84 - 57; 25 - 16; 42 - 27; 91 - 78; 58 - 15; 33 - 14; 67 - 38',
              operands: [
                { min: 10, max: 99 },
                { min: 11, max: 99 },
              ],
              operation: 'SUB',
            },
          ],
        },
      ],
    },
    {
      name: 'Daugyba iki 5',
      id: '220',
      topics: [
        {
          name: 'Skaičiaus 2 daugyba',
          id: '221',
          actions: [
            {
              condition: (a, b) => true,
              example: '2 * betkas',
              operands: [{ value: 2 }, { min: 1, max: 10 }],
              operation: 'MUL',
            },
            {
              condition: (a, b) => true,
              example: 'betkas * 2',
              operands: [{ min: 1, max: 10 }, { value: 2 }],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Skaičiaus 3 daugyba',
          id: '222',
          actions: [
            {
              condition: (a, b) => true,
              example: '3 * betkas',
              operands: [{ value: 3 }, { min: 1, max: 10 }],
              operation: 'MUL',
            },
            {
              condition: (a, b) => true,
              example: 'betkas * 3',
              operands: [{ min: 1, max: 10 }, { value: 3 }],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Skaičiaus 4 daugyba',
          id: '223',
          actions: [
            {
              condition: (a, b) => true,
              example: '4 * betkas',
              operands: [{ value: 4 }, { min: 1, max: 10 }],
              operation: 'MUL',
            },
            {
              condition: (a, b) => true,
              example: 'betkas * 4',
              operands: [{ min: 1, max: 10 }, { value: 4 }],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Skaičiaus 5 daugyba',
          id: '224',
          actions: [
            {
              condition: (a, b) => true,
              example: '5 * betkas',
              operands: [{ value: 5 }, { min: 1, max: 10 }],
              operation: 'MUL',
            },
            {
              condition: (a, b) => true,
              example: 'betkas * 5',
              operands: [{ min: 1, max: 10 }, { value: 5 }],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Skaiciaus 10 daugyba',
          id: '225',
          actions: [
            {
              condition: (a, b) => true,
              example: '10 * betkas',
              operands: [{ value: 10 }, { min: 1, max: 10 }],
              operation: 'MUL',
            },
            {
              condition: (a, b) => true,
              example: 'betkas * 10',
              operands: [{ min: 1, max: 10 }, { value: 10 }],
              operation: 'MUL',
            },
          ],
        },
      ],
    },
    {
      name: 'Dalyba',
      id: '230',
      topics: [
        {
          name: 'Dalyba iš 2',
          id: '231',
          actions: [
            {
              condition: (a, b) => true,
              example: 'a / 2',
              operands: [
                { oneOf: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
                { value: 2 },
              ],
              operation: 'DIV',
            },
          ],
        },
        {
          name: 'Dalyba iš 3',
          id: '232',
          actions: [
            {
              condition: (a, b) => true,
              example: 'a / 3',
              operands: [
                { oneOf: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30] },
                { value: 3 },
              ],
              operation: 'DIV',
            },
          ],
        },
        {
          name: 'Dalyba iš 4',
          id: '233',
          actions: [
            {
              condition: (a, b) => true,
              example: 'a / 4',
              operands: [
                { oneOf: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40] },
                { value: 4 },
              ],
              operation: 'DIV',
            },
          ],
        },
        {
          name: 'Dalyba iš 5',
          id: '234',
          actions: [
            {
              condition: (a, b) => true,
              example: 'a / 5',
              operands: [
                { oneOf: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] },
                { value: 5 },
              ],
              operation: 'DIV',
            },
          ],
        },
        {
          name: 'Dalyba iš 10',
          id: '235',
          actions: [
            {
              condition: (a, b) => true,
              example: 'a / 10',
              operands: [
                { oneOf: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] },
                { value: 10 },
              ],
              operation: 'DIV',
            },
          ],
        },
      ],
    },
  ],
};
