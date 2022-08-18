const express = require("express");

const router = express.Router();

const {
    addMessage,
    getAllMessage,
 
} = require("../controllers/messagesController");

router.post("/addMessage/", addMessage);
router.post("/getMessage/", getAllMessage);


module.exports = router;
