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
   

   
  };

 
  module.exports = { batteryIsOk}