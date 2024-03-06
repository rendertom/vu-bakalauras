const Operation = require('../lib/Operation');
const hasZeroInsideWhenDivided = require('./hasZeroInsideWhenDivided');

// has TDODOs
module.exports = {
  name: 'Ketvirta klasė',
  id: '400',
  sections: [
    {
      name: 'Sudėtis ir atimtis iki 10.000',
      id: '410',
      topics: [
        {
          name: 'Sudėtis iki 10.000',
          id: '411',
          actions: [
            {
              condition: (a, b) => a + b <= 10000,
              example: '3654 + 1762; 3076 + 5081; 4365 + 2634',
              operands: [
                { min: 1000, max: 8999 },
                { min: 1000, max: 9999 },
              ],
              operation: 'ADD',
            },
          ],
        },
        {
          // TODO
          name: 'Sudėtis išardant dešimtį, šimtą, tūkstantį',
          id: '412',
          actions: [
            {
              condition: (a, b) => a > b,
              example: '4572 - 2694; 9512 - 2548; 6541 - 593',
              operands: [
                { min: 1000, max: 9999 },
                { min: 100, max: 9999 },
              ],
              operation: 'SUB',
            },
          ],
        },
        {
          name: 'Atimtis išardant tūkstantį',
          id: '413',
          actions: [
            {
              condition: (a, b) => a > b && Operation.requiresBorrowing(a, b),
              example:
                '7000 - 2381; 10000 - 3752; 6001 - 1257; 10000 - 523; 4000 - 11; 4000 - 1',
              operands: [
                {
                  oneOf: [
                    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
                  ],
                },
                { min: 1, max: 9999 },
              ],
              operation: 'SUB',
            },
          ],
        },
      ],
    },
    {
      name: 'Daugyba ir dalyba iš pilnų dešimčių',
      id: '420',
      topics: [
        {
          name: 'Daugyba iš 10, 100, 1000',
          id: '421',
          actions: [
            {
              condition: (a, b) => a * b <= 10000,
              example:
                '28 * 10; 65 * 10; 11 * 100; 6 * 1000; 100 * 100; 1 * 10000',
              operands: [{ min: 1, max: 100 }, { oneOf: [10, 100, 1000] }],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Pilnų dešimčių daugyba',
          id: '422',
          actions: [
            {
              condition: (a, b) => a * b <= 10000,
              example: '30 * 30; 60 * 50; 80 * 60',
              operands: [
                { oneOf: [10, 20, 30, 40, 50, 60, 70, 80, 90] },
                { oneOf: [10, 20, 30, 40, 50, 60, 70, 80, 90] },
              ],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Daugyba iš pilnų dešimčių',
          id: '423',
          actions: [
            {
              condition: (a, b) => a * b <= 10000,
              example: '19 * 20; 184 * 30; 249 * 60; 61 * 30',
              operands: [
                { min: 10, max: 500 },
                { oneOf: [10, 20, 30, 40, 50, 60, 70, 80, 90] },
              ],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Daugyba iš pilnų šimtų, tūkstančių',
          id: '424',
          actions: [
            {
              condition: (a, b) => a * b <= 10000,
              example:
                '19 * 400; 2 * 2000; 28 * 300; 15 * 600; 5 * 2000; 32 * 200',
              operands: [
                { min: 1, max: 99 },
                {
                  oneOf: [
                    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000,
                    3000, 4000, 5000, 6000, 7000, 8000, 9000,
                  ],
                },
              ],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Dalyba iš 10, 100, 1000',
          id: '425',
          actions: [
            {
              condition: (a, b) => a > b && Number.isInteger(a / b),
              example:
                '700 / 10; 7000 / 1000; 100 / 10; 500 / 10; 2000 / 100; 1000 / 10',
              operands: [
                {
                  oneOf: [
                    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000,
                    3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
                  ],
                },
                { oneOf: [10, 100, 1000] },
              ],
              operation: 'DIV',
            },
          ],
        },
        {
          name: 'Dalyba iš pilnų dešimčių',
          id: '426',
          actions: [
            {
              condition: (a, b) => a > b && Number.isInteger(a / b),
              example:
                '210 / 70; 900 / 300; 1200 / 40; 1400 / 70; 2500 / 50; 2700 / 90; 3200 / 400; 5600 / 800;',
              operands: [
                {
                  oneOf: [
                    100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210,
                    220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330,
                    340, 350, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450,
                    460, 470, 480, 490, 500, 510, 520, 530, 540, 550, 560, 570,
                    580, 590, 600, 610, 620, 630, 640, 650, 660, 670, 680, 690,
                    700, 710, 720, 730, 740, 750, 760, 770, 780, 790, 800, 810,
                    820, 830, 840, 850, 860, 870, 880, 890, 900, 910, 920, 930,
                    940, 950, 960, 970, 980, 990, 1000, 1100, 1200, 1300, 1400,
                    1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400,
                    2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400,
                    3500, 3600, 3700, 3800, 3900, 4000, 4100, 4200, 4300, 4400,
                    4500, 4600, 4700, 4800, 4900, 5000, 5100, 5200, 5300, 5400,
                    5500, 5600, 5700, 5800, 5900, 6000, 6100, 6200, 6300, 6400,
                    6500, 6600, 6700, 6800, 6900, 7000, 7100, 7200, 7300, 7400,
                    7500, 7600, 7700, 7800, 7900, 8000, 8100, 8200, 8300, 8400,
                    8500, 8600, 8700, 8800, 8900, 9000, 9100, 9200, 9300, 9400,
                    9500, 9600, 9700, 9800, 9900, 10000,
                  ],
                },
                {
                  oneOf: [
                    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500,
                    600, 700, 800, 900,
                  ],
                },
              ],
              operation: 'DIV',
            },
          ],
        },
      ],
    },
    {
      name: 'Daugyba ir dalyba iki 10.000',
      id: '430',
      topics: [
        {
          name: 'Daugyba stulpeliu',
          id: '431',
          actions: [
            {
              condition: (a, b) => a * b <= 100000,
              example:
                '16 * 39; 52 * 37; 25 * 56; 41 * 85; 68 * 39; 42 * 18; 45 * 75; 93 * 52',
              operands: [
                { min: 10, max: 99 },
                { min: 10, max: 99 },
              ],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Triženklio ir dviženklio skaičių daugyba',
          id: '432',
          actions: [
            {
              condition: (a, b) => a * b <= 100000,
              example:
                '712 * 13; 467 * 21; 6464 * 15; 358 * 27; 823 * 12; 194 * 46',
              operands: [
                { min: 100, max: 999 },
                { min: 10, max: 99 },
              ],
              operation: 'MUL',
            },
          ],
        },
        {
          name: 'Dalyba iš vienaženklio skaičiaus, kai dalmenyje gauname nulį',
          id: '433',
          actions: [
            {
              condition: (a, b) =>
                a > b &&
                Number.isInteger(a / b) &&
                Operation.containsNumberInside(a / b, 0),
              example:
                '1608 / 8 = 201; 5015 / 5 = 1003; 2709 / 9 = 301; 2709 / 3 = 903; 7063 / 7 = 1009; 4248 / 6 = 708; 1515 / 3 = 505;',
              operands: [
                { oneOf: hasZeroInsideWhenDivided.quadruple }, // 1000...9927
                { min: 2, max: 8 },
              ],
              operation: 'DIV',
            },
            {
              condition: (a, b) =>
                a > b &&
                Number.isInteger(a / b) &&
                Operation.containsNumberInside(a / b, 0),
              example: '804 / 4 = 201; 981 / 9 = 109; 816 / 4 = 204;',
              operands: [
                { oneOf: hasZeroInsideWhenDivided.triple }, // 200...927
                { min: 2, max: 8 },
              ],
              operation: 'DIV',
            },
          ],
        },
        {
          name: 'Dalyba iš dviženklio skaičiaus',
          id: '434',
          actions: [
            {
              condition: (a, b) => a > b && Number.isInteger(a / b),
              example:
                '756 / 36 = 21; 5963 / 67 = 89; 285 / 15 = 19; 952 / 56 = 17; 5372 / 79 = 68',
              operands: [
                { min: 100, max: 10000 },
                { min: 10, max: 99 },
              ],
              operation: 'DIV',
            },
          ],
        },
      ],
    },
  ],
};
