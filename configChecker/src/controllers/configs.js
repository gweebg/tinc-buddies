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
    if (config.balance === 0 || !validateRisk(config, tinkerData)) return;

    const configTransactions = await fetchConfigTransactions(config.id);

    if (!validateNTransaction(config, configTransactions)) return;

    //logic
    const logicResponse = handleLogic(config, tinkerData, configTransactions);

    if (type !== "none")
      makeTransaction(
        logicResponse.amount,
        logicResponse.type,
        config.userID,
        config.id
      );
  } catch (error) {
    return { error: error.message };
  }
};
