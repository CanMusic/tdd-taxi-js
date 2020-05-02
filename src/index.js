const Taximeter = require('./taximeter');

export default function main(testDataFile = 'testData.txt') {
  return new Taximeter().getReceipt(testDataFile);
}

main();
