module.exports.makeTransaction = async (
  inputAmount,
  type,
  user = 1,
  config
) => {
  try {
    const response = await fetch("http://backend-app:3000/transactions/", {
      method: "POST",
      body: JSON.stringify({
        inputAmount,
        type,
        user,
        config,
      }),
      headers: { "Content-Type": "application/json" },
    });
    await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.fetchConfigTransactions = async (configID) => {
  try {
    const response = await fetch(
      `http://backend-app:3000/transactions/config/${configID}`
    );
    const transactions = await response.json();
    return transactions;
  } catch (error) {
    return { error: error.message };
  }
};
