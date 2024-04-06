const { makeTransaction, fetchConfigTransactions } = require("./transactions");
const {
  validateNTransaction,
  validateRisk,
  handleLogic,
  getConfigs,
} = require("../utils/configs");

module.exports.fetchActiveConfigs = async () => {
  try {
    const response = await fetch("http://backend-app:3000/configs");
    const configs = await response.json();
    return configs;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.handleConfig = async (config, tinkerData) => {
  try {
    if (config.balance === 0 || !validateRisk(config, tinkerData))
      return [0, "none"];

    const configTransactions = await fetchConfigTransactions();

    if (!validateNTransaction(config, configTransactions)) return [0, "none"];

    console.log(configTransactions);
    //logic
    const [inputAmount, type] = handleLogic(
      config,
      tinkerData,
      configTransactions
    );

    if (type !== "none")
      makeTransaction(inputAmount, type, config.userID, config.id);
    return [inputAmount, type];
  } catch (error) {
    return { error: error.message };
  }
};
