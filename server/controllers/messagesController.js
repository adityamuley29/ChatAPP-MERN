const mongoose = require("mongoose");
const messageSchema = require("../models/messageModel");
const Message = mongoose.model("messages", messageSchema);
const crypto = require("crypto");
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ msg: "Message added Successfully" });
    } else {
      return res.json({ msg: "Failed to add Message" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    // Below commented code is for encryption nd decpryction of message

    // const encryptedData = crypto.publicEncrypt({
    //   key: publicKey,
    //   padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    //   oaepHash: "sha256",
    // },Buffer.from("hello"));

    // console.log(encryptedData.toString("base64"));

    // const decryptedData = crypto.privateDecrypt({
    //   key:privateKey,
    //   padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    //   oaepHash: "sha256",
    // },
    // encryptedData
    // )

    // console.log(decryptedData.toString());

    res.json(projectedMessages);
  } catch (error) {
    next(error);
  }
};
