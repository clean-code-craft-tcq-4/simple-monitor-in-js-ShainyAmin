const {expect} = require('chai');

const {batteryIsOk} = require('./bms-monitor');

expect(batteryIsOk(50, 85, 0, "english")).to.be.false;

expect(batteryIsOk(25, 70, 0.7,'ENGLISH')).to.be.true;

expect(batteryIsOk(50, 85, 0, "germen")).to.be.false;

expect(batteryIsOk(25, 70, 0.7,'GERMAN')).to.be.true;