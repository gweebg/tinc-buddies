const { makeTransaction } = require("./transactions");

module.exports.getActiveConfigs = async () => {
  try {
    const response = await fetch("http://backend-app:3000/configs");
    const configs = await response.json();
    return configs;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.handleConfig = async (config, tinkerData, userData) => {
  try {
    //logic

    makeTransaction();
    return 2;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.handleUserConfigs = async (configs, tinkerData) => {
  try {
    const response = await fetch("http://backend-app:3000/");
    const userData = await response.json();
    for (const config of configs) {
      const amountSpent = await this.handleConfig(config, tinkerData, userData);
      userData.balance -= amountSpent;
    }
  } catch (error) {
    return { error: error.message };
  }
};
