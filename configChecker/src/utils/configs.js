module.exports.validateNTransaction = async (config, transactionsHistory) => {
  const todayTransactions = transactionsHistory.filter((transaction) =>
    isDateToday(new Date(transaction.date))
  );
  return config.maxNumberOfTransactions > todayTransactions.length;
};

module.exports.validateRisk = async (config, tinkerData) => {
  return (
    config.minTransactionRisk < tinkerData.volatility &&
    tinkerData.volatility < config.maxTransactionRisk
  );
};

const isDateToday = (date) => {
  const today = new Date();
  today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate();
};

module.exports.handleLogic = (config, tinkerData) => {
  let action = tinkerData.up ? "buy" : "sell";
  let amount =
    (action === "buy"
      ? Math.min(config.maxTransactionAmount, config.budget)
      : config.acquire) * tinkerData.trust;

  const lookAheadHoursPredictions = tinkerData.predictions
    .splice(0, config.lookAheadHours)
    .unshift(tinkerData.price);

  if (action === "buy") {
    const buyIndex = checkMostProfitBuy(lookAheadHoursPredictions);
    if (buyIndex !== 0) {
      action = "none";
      amount = 0;
    }
  } else {
    const sellIndex = checkMostProfitSell(lookAheadHoursPredictions);
    if (sellIndex !== 0) {
      action = "none";
      amount = 0;
    }
  }

  return [action, amount];
};

const checkMostProfitBuy = (lookAheadHoursPredictions) => {
  let totProfit = 0;
  let biggestProfitIndex = 0;
  let currentBiggestProfit = 0;
  let i = 0;
  for (; i < lookAheadHoursPredictions.length; i++) {
    for (let j = i + 1; j < lookAheadHoursPredictions.length; j++) {
      const profit =
        lookAheadHoursPredictions[j] - lookAheadHoursPredictions[i];
      if (profit > totProfit) {
        totProfit = profit;
        biggestProfitIndex = i;
      }
      if (i === 0 && currentBiggestProfit < profit) {
        currentBiggestProfit = profit;
      }
    }
  }

  if (totProfit - currentBiggestProfit > 1) return i;

  return i;
};

const checkMostProfitSell = (lookAheadHoursPredictions) => {
  let totSell = 0;
  let biggestProfitIndex = 0;
  let i = 0;
  for (; i < lookAheadHoursPredictions.length; i++) {
    for (let j = i + 1; j < lookAheadHoursPredictions.length; j++) {
      if (lookAheadHoursPredictions[j] > totSell) {
        totSell = profit;
        biggestSellIndex = i;
      }
    }
  }
  if (totSell - lookAheadHoursPredictions[0] > 1) return i;
  return 0;
};
