var express = require("express");
var router = express.Router();
var cron = require("node-cron");
const { fetchActiveConfigs, handleConfig } = require("../controllers/configs");
const { fetchTinkerData } = require("../controllers/tinker");

/* GET home page. */

cron.schedule(" */2 * * * * *", async () => {
  console.log("A cron job that runs every 2 seconds");
  const tinkerData = await fetchTinkerData();
  const configs = await fetchActiveConfigs();

  for (const config of configs) {
    handleConfig(config, tinkerData);
  }
});

module.exports = router;
