var express = require("express");
var router = express.Router();
var cron = require("node-cron");
const { getActiveConfigs, handleConfig } = require("../controllers/configs");

/* GET home page. */

const dummyData = {
  price: 100,
};

cron.schedule(" */2 * * * * *", async () => {
  console.log("A cron job that runs every 2 seconds");
  console.log(dummyData);
  const configs = await getActiveConfigs();

  for (const userConfigs of configs) {
    handleConfig(userConfigs, dummyData);
  }
});

module.exports = router;
