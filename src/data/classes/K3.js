const Operation = require('../lib/Operation');

// has TODOs

module.exports = {
  name: 'Trečia klasė',
  id: '300',
  sections: [
    {
      name: 'Sudėtis ir atimtis iki 1000',
      id: '310',
      topics: [
        {
          name: 'Sudėtis iki 1000',
          id: '311',
          actions: [
            {
              condition: (a, b) =>
                a + b <= 1000 && !Operation.requiresCarrying(a, b),
              example: '683 + 4; 102 + 61; 458 + 321',
              operands: [
                { min: 100, max: 999 },
                { min: 1, max: 999 },
              ],
              operation: 'ADD',
            },
          ],
        },
        {
          name: 'Sudėtis, kai susidaro nauja dešimtis',
          id: '312',
          actions: [
            {
              condition: (a, b) =>
                a + b <= 1000 &&
                Operation.requiresCarryingAt(a, b, 0) &&
                !Operation.requiresCarryingAt(a, b, 1),
              example: '254 + 238; 217 + 55; 336 + 5',
              operands: [
                { min: 100, max: 999 },
                { min: 1, max: 999 },
              ],
              operation: 'ADD',
            },
          ],
        },
        {
          name: 'Sudėtis, kai susidaro naujas šimtas',
          id: '313',
          actions: [
            {
              condition: (a, b) =>
                a + b <= 1000 && Operation.requiresCarryingAt(a, b, 1),
              example: '437 + 289; 198 + 74; 248 + 674',
              operands: [
                { min: 100, max: 999 },
                { min: 10, max: 999 },
              ],
              operation: 'ADD',
            },
          ],
        },
        {
          name: 'Atimtis neardant dešimties, šimto',
          id: '314',
          actions: [
            {
              condition: (a, b) => a > b && !Operation.requiresBorrowing(a, b),
              example: '576 - 4; 837 - 21; 485 - 124',
              operands: [
                { min: 100, max: 999 },
                { min: 1, max: 999 },
              ],
              operation: 'SUB',
            },
          ],
        },
        {
          // TODO
          name: 'Atimtis išardant dešimtį',
          id: '315',
          actions: [
            {
              condition: (a, b) => a > b,
              example: '541 - 3; 541 - 33; 541 - 333',
              operands: [
                { min: 100, max: 999 },
                { min: 1, max: 999 },
              ],
              operation: 'SUB',
            },
          ],
        },
        {
          // TODO
          name: 'Atimtis išardant dešimtį, šimtą',
          id: '316',
          actions: [
            {
              condition: (a, b) => a > b,
              example: '420 - 142; 523 - 346; 661 - 564; 435 - 246; 553 - 146',
              operands: [
                { min: 100, max: 999 },
                { min: 100, max: 999 },
              ],
              operation: 'SUB',
            },
          ],
        },
        {
          // TODO
          name: 'Atimtis išardant šimtą',
          id: '317',
          actions: [
            {
              condition: (a, b) => a > b && Operation.requiresBorrowing(a, b),
              example:
                '500 - 271; 300 - 124; 200 - 67; 800 - 566; 307 - 28; 207 - 59; 1000 - 134; 501 - 232; 705 - 457',
              operands: [
                { min: 100, max: 1000 },
                { min: 10, max: 999 },
              ],
              operation: 'SUB',
            },
          ],
        },
      ],
    },
    {
      name: 'Daugyba ir dalyba iki 100',
      id: '320',
      topics: [
        {
          name: 'Skaičiaus 6 daugyba',
          id: '321',
          actions: [
            {
              condition: (a, b) => true,
              example: '6 * betkas',
              operands: [{ value: 6 }, { min: 1, max: 10 }],
              operation: 'MUL',
            },
            {
              condition: (a, b) => true,
              example: 'betkas * 6',
              operands: [{ min: 1, max: 10 }, { value: 6 }],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Skaičiaus 7 daugyba',
          id: '322',
          actions: [
            {
              condition: (a, b) => true,
              example: '7 * betkas',
              operands: [{ value: 7 }, { min: 1, max: 10 }],
              operation: 'MUL',
            },
            {
              condition: (a, b) => true,
              example: 'betkas * 7',
              operands: [{ min: 1, max: 10 }, { value: 7 }],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Skaičiaus 8 daugyba',
          id: '323',
          actions: [
            {
              condition: (a, b) => true,
              example: '8 * betkas',
              operands: [{ value: 8 }, { min: 1, max: 10 }],
              operation: 'MUL',
            },
            {
              condition: (a, b) => true,
              example: 'betkas * 8',
              operands: [{ min: 1, max: 10 }, { value: 8 }],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Skaičiaus 9 daugyba',
          id: '324',
          actions: [
            {
              condition: (a, b) => true,
              example: '9 * betkas',
              operands: [{ value: 9 }, { min: 1, max: 10 }],
              operation: 'MUL',
            },
            {
              condition: (a, b) => true,
              example: 'betkas * 9',
              operands: [{ min: 1, max: 10 }, { value: 9 }],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Dalyba iš 6',
          id: '325',
          actions: [
            {
              condition: (a, b) => true,
              example: 'a / 6',
              operands: [
                { oneOf: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60] },
                { value: 6 },
              ],
              operation: 'DIV',
            },
          ],
        },
        {
          name: 'Dalyba iš 7',
          id: '326',
          actions: [
            {
              condition: (a, b) => true,
              example: 'a / 7',
              operands: [
                { oneOf: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70] },
                { value: 7 },
              ],
              operation: 'DIV',
            },
          ],
        },
        {
          name: 'Dalyba iš 8',
          id: '327',
          actions: [
            {
              condition: (a, b) => true,
              example: 'a / 8',
              operands: [
                { oneOf: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80] },
                { value: 8 },
              ],
              operation: 'DIV',
            },
          ],
        },
        {
          name: 'Dalyba iš 9',
          id: '328',
          actions: [
            {
              condition: (a, b) => true,
              example: 'a / 9',
              operands: [
                { oneOf: [9, 18, 27, 36, 45, 54, 63, 72, 81, 90] },
                { value: 9 },
              ],
              operation: 'DIV',
            },
          ],
        },
      ],
    },
    {
      name: 'Daugyba ir dalyba iki 1000',
      id: '330',
      topics: [
        {
          name: 'Daugyba iš pilnų dešimčių',
          id: '331',
          actions: [
            {
              condition: (a, b) => a * b >= 100 && a * b <= 1000,
              example: '5 * 30; 5 * 100, 10 * 100',
              operands: [
                { min: 1, max: 10 },
                {
                  oneOf: [
                    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500,
                  ],
                },
              ],
              operation: 'MUL',
            },
            {
              condition: (a, b) => a * b >= 100 && a * b <= 1000,
              example: '40 * 6; 200 * 3;',
              operands: [
                {
                  oneOf: [
                    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500,
                  ],
                },
                { min: 1, max: 10 },
              ],
              operation: 'MUL',
            },
          ],
        },
        {
          // TODO
          name: 'Dviženklių, triženklių skaičių daugyba iš vienaženklio skaičiaus',
          id: '332',
          actions: [
            {
              condition: (a, b) => a * b <= 1000,
              example: '21 * 3; 221 * 3; 12 * 4; 313 * 3;',
              operands: [
                { min: 10, max: 999 },
                { min: 1, max: 9 },
              ],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Dviženklių, vienaženklių skaičių daugyba, kai susidaro nauja desimtis',
          id: '333',
          actions: [
            {
              condition: (a, b) => Operation.requiresCarryingMult(a, b),
              example: '37 * 2; 47 * 5;',
              operands: [
                { min: 10, max: 99 },
                { min: 2, max: 9 },
              ],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Triženklių skaičių daugyba, kai susidaro naujos dešimtys, šimtai',
          id: '334',
          actions: [
            {
              condition: (a, b) =>
                a * b <= 1000 && Operation.requiresCarryingMult(a, b),
              example:
                '134 * 6; 133 * 3; 229 * 4; 433 * 2; 271 * 3; 125 * 8; 498 * 2',
              operands: [
                { min: 100, max: 999 },
                { min: 2, max: 9 },
              ],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Triženklių skaičių daugyba, kai dešimčių arba vienetų yra 0',
          id: '335',
          actions: [
            {
              condition: (a, b) => true,
              example: '104 * 3; 101 * 8; 109 * 7',
              operands: [
                { oneOf: [101, 102, 103, 104, 105, 106, 107, 108, 109] },
                { min: 2, max: 9 },
              ],
              operation: 'MUL',
            },
            {
              condition: (a, b) => a * b <= 1000,
              example: '150 * 6; 140 * 2; 110 * 3;',
              operands: [
                { oneOf: [110, 120, 130, 140, 150, 160, 170, 180, 190] },
                { min: 2, max: 9 },
              ],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Dviženklių, triženklių skaičių dalyba eilute',
          id: '336',
          actions: [
            {
              condition: (a, b) =>
                a > b &&
                Number.isInteger(a / b) &&
                !Operation.requiresBorrowing(a, b),
              example: '55 / 5; 48 / 4; 963 / 3; 844 / 2',
              operands: [
                { min: 10, max: 1000 },
                { min: 1, max: 9 },
              ],
              operation: 'DIV',
            },
          ],
        },
        {
          name: 'Dviženklių, triženlių skaičių dalyba kampu',
          id: '337',
          actions: [
            {
              condition: (a, b) => a > b && Number.isInteger(a / b),
              example: '54 / 3; 195 / 5; 36 / 2; 75 / 5; 329 / 7',
              operands: [
                { min: 10, max: 1000 },
                { min: 1, max: 9 },
              ],
              operation: 'DIV',
            },
          ],
        },
      ],
    },
  ],
};
