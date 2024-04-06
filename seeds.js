fetch("http://localhost:3000/accounts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "john doe",
    balance: 200,
  }),
});

fetch("http://localhost:3000/configs", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "million dollar baby",
    description: "Lots of money ba by",
    userID: 1,
    balance: 100,
    acquired: 100,
    budget: 50,
    activated: true,
  }),
});

fetch("http://localhost:3000/transactions", {
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
