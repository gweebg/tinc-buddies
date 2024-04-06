module.exports.validateNTransaction = async (config, transactionsHistory) => {
  const todayTransactions = transactionsHistory.filter((transaction) =>
    isDateToday(new Date(transaction.date))
  );
  return config.maxNumberOfTransactions > todayTransactions.length;
};

module.exports.validateRisk = async (config, tinkerData) => {
  return (
    config.minTransactionRisk < tinkerData.risk &&
    tinkerData.risk < config.maxTransactionRisk
  );
};

const isDateToday = (date) => {
  const today = new Date();
  today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate();
};
