module.exports.makeTransaction = async (
  inputAmount,
  type,
  userID,
  configID
) => {
  try {
    await fetch("http://backend-app:3000/transactions/", {
      method: "POST",
      body: JSON.stringify({ inputAmount, type, userID, configID }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return { error: error.message };
  }
};
