const exp = require("express");
const bcrypt = require("bcrypt");
const patientController = require("../controllers/patientCont.js");
const router = exp.Route();
module.exports = {
    "/patient/signUp/": { "handler": patientController.signUp, "type": "post", "auth": false },
    "/patient/login/": { "handler": patientController.Login, "type": "post", "auth": true },
    "/patient/update/": { "handler": patientController.Update, "type": "post", "auth": true },
    "/patient/account/": { "handler": patientController.GetAccount, "type": "get", "auth": false },
    "/patient/Write/Message/": { "handler": patientController.WriteMessage, "type": "post", "auth": false },
    "/patient/get/Messages/": { "handler": patientController.GetConversation, "type": "post", "auth": false }
};