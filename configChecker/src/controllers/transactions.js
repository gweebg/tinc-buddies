module.exports.makeTransaction = async (
  inputAmount,
  type,
  userID,
  configID
) => {
  try {
    const response = await fetch("http://backend-app:3000/transactions/", {
      method: "POST",
      body: JSON.stringify({
        inputAmount,
        type,
        userID,
        config: { id: configID },
      }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    console.log(json);
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
