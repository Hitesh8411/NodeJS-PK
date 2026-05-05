const express = require("express");
const router = express.Router();

const Person = require("../models/Person");

//post route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; //assuming the request body contains the Person ddata]

    //create a new person documnet using moongoose model
    const newPerson = new Person(data);

    //save the new person to the database

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//GET method to get the person
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    // extract the work type from the URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// upadate operation
// two aspect as imp  ;
// which record we want to update (id)objectid
// what exactly we want to update

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extract the id from the url parameter
    const updatePersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        returnDocument: "after", // return the updated documnet
        runValidators: true, // run moongoose validation
      },
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted");
    res
      .status(200)
      .json({ meassage: "person delted successfully", deletedData: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
