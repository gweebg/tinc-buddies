var express = require("express");
var router = express.Router();
var cron = require("node-cron");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
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

cron.schedule(" */2 * * * * *", () => {
  console.log("A cron job that runs every 2 seconds");
});

module.exports = router;
