const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
module.exports = {
    StartSession: function (req, res, next) {
        db.session.create({
            patientId: req.body.patientId,
            doctorId: req.body.doctorId
        }).then((results) => {
            res.status(200).json({
                status: 1,
                message: "session has started"
            });
        }).catch((error) => {
            res.status(500).json({
                status: 0,
                message: error
            });
        });
    }
};