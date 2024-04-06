const { makeTransaction } = require("./transactions");
const { validateNTransaction, validateRisk } = require("../utils/configs");

module.exports.getActiveConfigs = async () => {
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
    if (config.balance === 0 || !validateRisk(config, tinkerData)) {
      return 0;
    }

    const transactionsResponse = await fetch(
      "http://backend-app:3000/transactions/config/" + config.id
    );
    const configTransactions = await transactionsResponse.json();

    if (!validateNTransaction(config, configTransactions)) return 0;

    console.log(configTransactions);
    //logic
    const [inputAmount, type] = handleLogic();

    if (inputAmount > 0)
      makeTransaction(inputAmount, type, config.userID, config.id);
    return inputAmount;
  } catch (error) {
    return { error: error.message };
  }
};
