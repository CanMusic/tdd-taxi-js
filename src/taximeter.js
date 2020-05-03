const fs = require('fs');
const path = require('path');
const os = require('os');

class Taximeter {
  constructor() {
    this.rules = [
      () => 6,
      distance => (distance > 2 ? (distance - 2) * 0.8 : 0),
      distance => (distance > 8 ? (distance - 8) * 0.4 : 0),
      (distance, time) => time * 0.25,
    ];
  }

  parseRecord(record) {
    this.expression = /^(\d+)公里,等待(\d+)分钟$/;
    const data = record.match(this.expression);
    if (!data || data.length < 3) throw new Error('record format error');
    const distance = data[1];
    const time = data[2];
    return { distance, time };
  }

  getPrice(record) {
    const data = this.parseRecord(record);
    const reducer = (result, rule) => result + rule(data.distance, data.time);
    return Math.round(this.rules.reduce(reducer, 0));
  }

  getReceipt(file) {
    const filePath = path.join('./src/fixtures', file);
    const fileData = fs.readFileSync(filePath, 'utf8');
    const lines = fileData.split(os.EOL);
    let receipt = '';
    lines.forEach(line => {
      receipt += `收费${this.getPrice(line)}元\n`;
    });
    return receipt;
  }
}

module.exports = Taximeter;
