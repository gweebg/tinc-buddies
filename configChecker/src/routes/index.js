var express = require("express");
var router = express.Router();
var cron = require("node-cron");
const {
  getActiveConfigs,
  handleUserConfigs,
} = require("../controllers/configs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Welcome to the config checker service");
});

router.post("/add_config", function (req, res, next) {
  console.log(req.body);
  res.send("Config added successfully");
});

router.post("/activate_config/:id", function (req, res, next) {
  console.log(req.params.id);
  res.send("Config activated successfully " + req.params.id);
});

router.post("/deactivate_config/:id", function (req, res, next) {
  console.log(req.params.id);
  res.send("Config deactivated successfully " + req.params.id);
});

router.delete("/delete_config/:id", function (req, res, next) {
  console.log(req.params.id);
  res.send("Config deleted successfully " + req.params.id);
});

const dummyData = {
  price: 100,
};

cron.schedule(" */2 * * * * *", async () => {
  console.log("A cron job that runs every 2 seconds");
  console.log(dummyData);
  const configs = await getActiveConfigs();

  const groupedConfigs = configs.reduce((acc, config) => {
    if (acc[config.user.id]) {
      acc[config.user.id].push(config);
    } else {
      acc[config.user.id] = [config];
    }
    return acc;
  });

  for (const userConfigs of groupedConfigs) {
    handleUserConfigs(userConfigs, dummyData);
  }
});

module.exports = router;
