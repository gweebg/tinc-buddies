const seeds = async () => {
  try {
    const resUser = await fetch("http://localhost:3000/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "john doe",
        balance: 200,
      }),
    });

    resUser.ok
      ? console.log("User successful")
      : console.log("User not created");

    const resConfig = await fetch("http://localhost:3000/configs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "million dollar baby",
        description: "Lots of money ba by",
        userID: 1,
        acquired: 100,
        budget: 100,
        activated: true,
      }),
    });

    resConfig.ok
      ? console.log("Config successful")
      : console.log("Config not created");

    const resTxns = await fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: 1,
        config: { id: 10 },
        inputAmount: 100,
        type: "BUY",
      }),
    });

    resTxns.ok
      ? console.log("Transaction successful")
      : console.log("Transaction not created");
  } catch (error) {
    console.log(error);
  }
};

seeds();
