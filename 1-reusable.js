'use strict';

// Идентификаторы

const name = 'Alexander';

const YEAR_OF_BIRTH = 1973;

function print(name) {
  console.log(name);
}

print('Alexander');
print(name);
print(YEAR_OF_BIRTH);

// Циклы

for (let x = 15; x <= 30; x += 2) {
  console.log(x);
}

function range(begin, end) {
  const odd = begin - begin % 2 + 1;

  for (let x = odd; x <= end; x += 2) {
    console.log(x);
  }
}
range(15, 30);

// Функции

const average = (a, b) => (parseInt(a) + parseInt(b)) / 2;
console.log('Add numbers: 5 + 2 = ' + average(5, 2));
console.log('Add floats: 5.1 + 2.3 = ' + average(5.1, 2.3));
console.log('Concatenate: \'5\' + \'2\' = ' + average('5', '2'));
console.log('Subtraction: 5 + (-2) = ' + average(5, -2));
const square = x => parseInt(x) ** 2;
const cube = x => parseInt(x) ** 3;

for (let i = 0; i < 10; i++) {
  console.log(average(square(i), cube(i)));
}

// Объекты

const obj = { name: '' };
let v = { name: '' };

obj.name = 'const';
v.name = 'var';
console.log(obj, v);

// obj = { name: 'other' }
v = { name: 'other' };

function createUser(name, city) {
  return { name, city };
}
console.log(createUser('Marcus Aurelius', 'Roma'));

// Массивы

const phoneBook = [
  { name: 'Marcus Aurelius', phone: '+380445554433' },
  { name: 'Gaius Iulius Caesar', phone: '+380443334455' }
];

function findPhoneByName(name) {
  const result = phoneBook.find(item => item.name === name);
  return result ? result.phone : undefined;
}
console.log(findPhoneByName('Marcus Aurelius'));
console.log(findPhoneByName('Anonymous'));

// Коллекции: хеш-таблицы

const hash = {
  'Marcus Aurelius': '+380445554433',
  'Gaius Iulius Caesar': '+380443334455'
};

function findPhoneByName2(name) {
  return hash[name];
}
console.log(findPhoneByName2('Marcus Aurelius'));
console.log(findPhoneByName2('Anonymous'));
