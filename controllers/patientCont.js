const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
module.exports = {
    signUp: function (req, res, next) {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
            db.patient.create(
                {
                    name: req.body.name,
                    password: hash,
                    address: req.body.address,
                    email: req.body.email,
                    phone: req.body.phone,
                }
            ).then((results) => {
                res.status(200).json({
                    status: 1,
                    message: "singUp is done successfully"
                });
            }).catch((error) => {
                res.status(505).json({
                    status: 0,
                    message: "SingUp is failed"
                });
            });
        });
    },
    Login: function (req, res, next) {
        db.patient.findOne({ where: { email: req.body.email } }).then((results) => {
            bcrypt.compare(req.body.password, results.password, (error, same) => {
                if (same) {
                    const token = jwt.sign({
                        password: results.password,
                        email: results.email,
                    },
                        config.scure.private,
                        {
                            expiresIn: "24h"
                        }
                    );
                    res.status(200).json({

                        status: 1,
                        account: results,
                        message: "loggin is sucessfully done",
                        token: token
                    });
                } else {
                    res.status(200).json({
                        status: -1,
                        message: "check your data again"
                    });
                }
            });
        });
    },
    Update: function (req, res, next) {
        db.patient.update({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
        }, { where: { email: req.body.email } }).then((results) => {
            res.status(200).json({
                status: 1,
                message: "updating record is done",
            }
            );
        }).catch((error) => {
            res.status(500).json(
                {
                    status: -1,
                    message: error
                }
            );
        });
    },
    GetAccount: function (req, res, next) {
        db.patient.findOne({ where: { id: req.body.id } }).then((results) => {
            if (results) {
                res.status(200).json({
                    status: 1,
                    message: results
                });
            } else {
                res.status(404).json({
                    status: 0,
                    message: "not found"
                });
            }
        });
    },
    //write a message as a a patient in session
    WriteMessage: function (req, res, next) {
        db.messages.create({
            message: req.body.message,
            sessionId: req.body.sessionId,
            sender_type: 0,
            time: new Date().getTime(),
        }).then((results) => {
            res.status(200).json({
                status: 1,
                message: "message was sent successfully"
            });
        });
    },
    //load all the conversations of the doctor and the patient
    GetConversation: function (req, res, next) {
        db.messages.findAll({ where: { sessionId: req.body.sessionId } }).then((results) => {
            res.status(200).json({
                status: 1,
                message: "reading your messages is done",
                messages: results
            });
        }).catch((error) => {
            res.status(500).json({
                status: 0,
                message: error
            });
        });
    }
};