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
    if (!validateRisk(config, tinkerData)) return;

    const configTransactions = await fetchConfigTransactions(config.id);

    if (!validateNTransaction(config, configTransactions)) return;

    //logic
    const logicResponse = handleLogic(config, tinkerData, configTransactions);

    if (logicResponse.type !== "none") {
      console.log(
        `Transaction made: ${logicResponse.amount} ${logicResponse.type} for config ${config.id}`
      );
      makeTransaction(
        logicResponse.amount,
        logicResponse.type,
        config.user,
        config.id
      );
    } else {
      console.log(`No transaction made for config ${config.id}`);
    }
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
