const seeds = async () => {
  try {
    const resUser = await fetch("http://localhost:3000/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: 1,
        name: "First User",
        balance: 10000,
      }),
    });
    
    resUser.ok
      ? console.log("User successful")
      : console.log("User not created");

    await fetch("http://localhost:3000/configs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Bot 1",
        description: "Default Bot",
        user : 1,
        acquired: 0,
        budget: 1000,
        activated: true,
      }),
    });

    await fetch("http://localhost:3000/configs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Bot 2",
        description: "Max 50 trade aamount",
        user : 1,
        acquired: 0,
        maxTransactionAmount: 50,
        budget: 1000,
        activated: true,
      }),
    });

    await fetch("http://localhost:3000/configs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Bot 3",
        description: "Just 1 trade",
        user : 1,
        acquired: 0,
        maxTransactionAmount: 50,
        maxNumberOfTransactions: 1,
        budget: 1000,
        activated: true,
      }),
    });

    await fetch("http://localhost:3000/configs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Bot 4",
        description: "Risky bot",
        user : 1,
        acquired: 0,
        minTransactionRisk: 3,
        budget: 1000,
        activated: true,
      }),
    });

    await fetch("http://localhost:3000/configs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Bot 5",
        description: "UnRisky bot",
        user : 1,
        acquired: 0,
        maxTransactionRisk: 2,
        budget: 1000,
        activated: true,
      }),
    });


    // const resTxns = await fetch("http://127.0.0.1:3000/transactions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     user: 11,
    //     config: 1,
    //     inputAmount: 100,
    //     type: "BUY",
    //   }),
    // });

    // resTxns.ok
    //   ? console.log("Transaction successful")
    //   : console.log("Transaction not created");
  } catch (error) {
    console.log(error);
  }
};

seeds();
