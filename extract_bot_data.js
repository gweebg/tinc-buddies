const fs = require("node:fs");
const bot_id = 1;

const get_bot_data = async (id) => {
  try {
    const data = await fetch(
      "http://localhost:3000/transactions/config/" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await data.json();
  } catch (error) {
    console.log(error);
  }
};

get_bot_data(bot_id).then((data) => {
    console.log(data)
  fs.writeFile("BOT/" + bot_id + ".json", JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });
});
