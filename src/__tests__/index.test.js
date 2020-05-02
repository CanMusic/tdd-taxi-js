const fs = require('fs');
const path = require('path');
const os = require('os');
const Taximeter = require('../taximeter');

const readLines = file => {
  const filePath = path.join(__dirname, `../fixtures/${file}`);
  const fileData = fs.readFileSync(filePath, 'utf8');
  return fileData.split(os.EOL);
};

test('example', () => {
  const taxi = new Taximeter();
  const receipt = '收费6元\n收费7元\n收费13元\n收费7元\n';
  expect(taxi.getReceipt('testData.txt')).toBe(receipt);
  expect(taxi.getPrice('1公里,等待0分钟')).toBe('收费6元\n');
  expect(taxi.getPrice('3公里,等待0分钟')).toBe('收费7元\n');
  expect(taxi.getPrice('10公里,等待0分钟')).toBe('收费13元\n');
  expect(taxi.getPrice('2公里,等待3分钟')).toBe('收费7元\n');
});

test('test data file`s format', () => {
  const taxi = new Taximeter();
  expect(() => taxi.getReceipt('testFormat.txt')).toThrow();
});

test('test data`s format', () => {
  const records = readLines('testFormat.txt');
  const taxi = new Taximeter();
  records.forEach(record => {
    expect(() => taxi.getPrice(record)).toThrow();
  });
});

test('test error argument', () => {
  const taxi = new Taximeter();
  expect(() => taxi.getPrice()).toThrow();
  expect(() => taxi.getPrice({})).toThrow();
  expect(() => taxi.getPrice(true)).toThrow();
  expect(() => taxi.getPrice(false)).toThrow();
  expect(() => taxi.getPrice(0)).toThrow();
  expect(() => taxi.getPrice(-1)).toThrow();
});
