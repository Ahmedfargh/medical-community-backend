const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const db = require("../models");
module.exports = {
    //this method verfiy if he is the owner of the account
    isOwner: function (req, res, next) {
        try {
            var account = jwt.verify(req.body.token, config.scure.private);
            console.log(account);
            db.patients.findOne({ where: { email: account.email } }).then((results) => {
                if (results) {
                    next();
                } else {
                    res.status(401).json({
                        status: 0,
                        message: "auth failed"
                    });
                }
            });
            next();
        } catch (error) {
            return res.status(401).json({
                status: 0,
                message: "auth failed"
            });
        }
    },//this middleware check if the patient have session or not if not start one with the doctor
    HasSession: function (req, res, next) {
        db.session.findOne({ where: { patientId: req.body.patientId, doctorId: req.body.doctorId } }).then((results) => {
            if (results) {
                next();
            } else {
                db.session.create({
                    patientId: req.body.patientId, doctorId: req.body.doctorId,
                }).then((results) => {
                    next();
                }).catch((error) => {
                    res.status(500).json({
                        status: 0,
                        message: error
                    });
                });
            }
        }).catch((error) => {
            res.status(500).json({
                status: 0,
                message: "error"
            });
        });
    }
};