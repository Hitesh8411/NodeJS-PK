const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItem");

// post route to add a menu
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("menu saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Get methood to get a menu
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("menu detched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//GET method to get specific taste item
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    // extract the taste from the URL parameter
    if (taste == "sweet" || taste == "spicy" || taste == "sour") {
      const response = await Person.find({ taste: taste });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste " });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
