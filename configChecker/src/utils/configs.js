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
  let type = tinkerData.up ? "BUY" : "SELL";
  let amount =
    (type === "BUY"
      ? Math.min(config.maxTransactionAmount, config.budget)
      : config.acquired) * tinkerData.trust;

  const lookAheadHoursPredictions = tinkerData.predictions.splice(
    0,
    config.lookAheadHours
  );
  lookAheadHoursPredictions.unshift(tinkerData.price);

  if (type === "BUY") {
    const buyIndex = checkMostProfitBuy(lookAheadHoursPredictions);
    if (buyIndex !== 0) {
      type = "none";
      amount = 0;
    }
  } else {
    const sell = checkMostProfitSell(lookAheadHoursPredictions);
    if (!sell) {
      type = "none";
      amount = 0;
    }
  }

  return { amount, type };
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

  if (totProfit - currentBiggestProfit > currentBiggestProfit * 0.02) return i;

  return 0;
};

const checkMostProfitSell = (lookAheadHoursPredictions) => {
  const currentPrice = lookAheadHoursPredictions[0];
  const biggestSell = Math.max(lookAheadHoursPredictions);

  if (biggestSell - currentPrice > currentPrice * 0.02) return false;
  return true;
};
