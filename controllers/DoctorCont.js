const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
//this controller handle one model only doctor model and it's operations
module.exports = {
    signUp: function (req, res, next) {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
            db.doctor.create({
                name: req.body.name,
                password: hash,
                email: req.body.email,
                address: req.body.address,
                phone: req.body.phone,
                prof: req.body.prof,
                paragraph: req.body.paragraph
            }).then((results) => {
                res.status(200).json({
                    status: 1,
                    message: "doctor added successfully"
                });
            }).catch((error) => {
                res.status(505).json({
                    status: 0,
                    message: error
                });
            });
        });
    },
    LoginIn: function (req, res, next) {
        db.doctor.findOne({ where: { email: req.body.email } }).then((results) => {
            if (results) {
                bcrypt.compare(req.body.password, results.password, (error, same) => {
                    if (same) {//if the hash of the input is same of the recorded
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
                    } else {//the authentication failed
                        res.status(200).json({
                            status: -1,
                            message: "check your data again"
                        });
                    }
                });
            }
        });
    },
    Update: function (req, res, next) {
        db.doctor.update({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            prof: req.body.prof,
            paragraph: req.body.paragraph,
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
        db.doctor.findOne({ where: { id: req.body.id } }).then((results) => {
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
    }
};