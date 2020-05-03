const fs = require('fs');
const os = require('os');
const Taximeter = require('../taximeter');

test('example', () => {
  const taxi = new Taximeter();
  const receipt = '收费6元\n收费7元\n收费13元\n收费7元\n';
  expect(taxi.getReceipt('testData.txt')).toBe(receipt);
  expect(taxi.getPrice('1公里,等待0分钟')).toBe(6);
  expect(taxi.getPrice('3公里,等待0分钟')).toBe(7);
  expect(taxi.getPrice('10公里,等待0分钟')).toBe(13);
  expect(taxi.getPrice('2公里,等待3分钟')).toBe(7);
});

test('test data file`s format', () => {
  const taxi = new Taximeter();
  expect(() => taxi.getReceipt('testFormat.txt')).toThrow();
});

test('test data`s format', () => {
  const fileData = fs.readFileSync('./src/fixtures/testFormat.txt', 'utf8');
  const records = fileData.split(os.EOL);
  const taxi = new Taximeter();
  records.forEach(record => {
    expect(() => taxi.getPrice(record)).toThrow();
  });
});

test('test error argument for getReceipt', () => {
  const taxi = new Taximeter();
  expect(() => taxi.getReceipt()).toThrow();
  expect(() => taxi.getReceipt({})).toThrow();
  expect(() => taxi.getReceipt(true)).toThrow();
  expect(() => taxi.getReceipt(false)).toThrow();
  expect(() => taxi.getReceipt(0)).toThrow();
  expect(() => taxi.getReceipt(-1)).toThrow();
});

test('test error argument for getPrice', () => {
  const taxi = new Taximeter();
  expect(() => taxi.getPrice()).toThrow();
  expect(() => taxi.getPrice({})).toThrow();
  expect(() => taxi.getPrice(true)).toThrow();
  expect(() => taxi.getPrice(false)).toThrow();
  expect(() => taxi.getPrice(0)).toThrow();
  expect(() => taxi.getPrice(-1)).toThrow();
});
