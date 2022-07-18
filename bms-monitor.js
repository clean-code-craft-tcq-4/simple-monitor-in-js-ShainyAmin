const {expect} = require('chai');
const config = require('./bmsConfiguration.json');

function calculateWarningTolerance(maxLimit) {
   return maxLimit * config.WARNING_TOLERANCE_PERCENT; 
}

let language = '';

const batteryIsOk = (temperature, soc, chargeRate, lang) => {
  language = lang;
  let langIsEligible = languageIsEligible(lang);
    return getBatteryState(langIsEligible,temperature, soc, chargeRate,)
 };
 
 function getBatteryState(langIsEligible,temperature, soc, chargeRate)
 {

 if(langIsEligible){
  
   return bateryState(temperature, soc, chargeRate)
  }
  else
    return false;
}

function bateryState(temperature, soc, chargeRate) {

    return temperatureIsOK(temperature) && socIsOK(soc) && chargeRateIsOK(chargeRate);

}

function languageIsEligible(lang) {
    return config.LANGUAGES_SUPPORTED.includes(lang.toUpperCase())
}

const temperatureIsOK = (temperature) => {
    return checkBatteryState(temperature, config.MIN_TEMP, config.MAX_TEMP, 'TEMP');
  };
  
  const socIsOK = (soc) => {
    return checkBatteryState(soc, config.MIN_SOC, config.MAX_SOC, 'SOC');
  };
  
  const chargeRateIsOK = (chargeRate) => {
    return checkBatteryState(chargeRate, config.MIN_CHARGE_RATE, config.MAX_CHARGE_RATE, 'CHARGE_OUT');
  };

  const checkBatteryState = (batteryFactorValue, minLimit, maxLimit, bmsFactor) => {
    checkWarningLevel(minLimit, maxLimit, batteryFactorValue, bmsFactor);
    if (batteryFactorValue >= maxLimit || batteryFactorValue <= minLimit) {
          printStatement(bmsFactor,  "OUT_OF_RANGE");
      return false;
    }
    return true;
  };

  const printStatement = (statement, msg) => {
    var lang = language.toUpperCase();
    var msgCode = config[lang][statement] + " "+ config[lang][msg];
    console.log(msgCode);
  };
  
  const checkWarningLevel = (lowerLimit, upperLimit, value, statement) => {
    const WarningLimit = calculateWarningTolerance(upperLimit);
    let lowerHighLimit = lowerLimit + WarningLimit;
    let upperLowLimit = upperLimit - WarningLimit;

    checkLimits(value, lowerLimit, lowerHighLimit, upperLowLimit, upperLimit, statement);

    // if (lowerLimit > value) {
    //     printStatement(statement, "LOW_BREACH" );
      
    // }
    // if (lowerLimit <= value &&  lowerHighLimit >= value) {
    //     printStatement(statement, "LOW_WARNING" );
     
    // }
    // if (
    //     lowerHighLimit <= value &&
    //     upperLowLimit  >= value
    // ) {
    //     printStatement(statement, "NORMAL" );
      
    // }
    // if (upperLowLimit <= value && value >= upperLimit) {
    //     printStatement(statement, "HIGH_WARNING" );
     
    // }
    // if (upperLimit > value) {
    //     printStatement(statement, "HIGH_BREACH" );
    
    // }
  };

  function  checkLimits(value, lowerLimit, lowerHighLimit, upperLowLimit, upperLimit, statement) {
    switch (true) {
        case (lowerLimit > value):
            printStatement(statement, "LOW_BREACH" );
            break;
        case (lowerLimit <= value &&  lowerHighLimit >= value):
            printStatement(statement, "LOW_WARNING" );
            break;
        case (lowerHighLimit <= value && upperLowLimit  >= value):
            printStatement(statement, "NORMAL" );
            break;
        case (upperLowLimit <= value && value >= upperLimit):
            printStatement(statement, "HIGH_WARNING" );
            break;
        case (upperLimit > value):
            printStatement(statement, "HIGH_BREACH" );
            break;
    
        default:
            break;
    }
  }


  module.exports = { batteryIsOk}