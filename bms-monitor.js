const {expect} = require('chai');

function checkBatteryTemperature(temperature) {
    console.log("checkBatteryTemperature: ",temperature)
    if (temperature < 0 || temperature > 45) {
        console.log('Temperature is out of range!', temperature);
        return false;
    }
    
        return true;
    
}
function checkBatterySOC(soc) {
    console.log("checkBatterySOC: ",soc)
    if (soc < 20 || soc > 80) {
        console.log('State of Charge is out of range!')
        return false;
    } 
   
        return true;
    
}

function checkBatteryChargeRate(charge_rate) {
    console.log("checkBatteryChargeRate: ",charge_rate)
    if (charge_rate<=0 || charge_rate > 0.8) {
        console.log('Charge rate is out of range!');
        return false;
    }
    return true;
}

expect(checkBatteryTemperature(25)).to.be.true;
expect(checkBatterySOC(70)).to.be.true;
expect( checkBatteryChargeRate(0.7)).to.be.true;

expect(checkBatteryTemperature(50)).to.be.false;
expect(checkBatterySOC(85)).to.be.false;
expect( checkBatteryChargeRate(0)).to.be.false;



// expect(batteryIsOk(25, 70, 0.7)).to.be.true;
// expect(batteryIsOk(50, 85, 0)).to.be.false;
