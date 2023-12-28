const exp=require("express");
const bcrypt=require("bcrypt");
const doctorController=require("../controllers/DoctorCont.js");
const router=exp.Route();
module.exports={
    "/doctor/signUp/":{"handler":doctorController.signUp,"type":"post","auth":false},
    "/doctor/login/":{"handler":doctorController.LoginIn,"type":"post","auth":true},
    "/doctor/update/":{"handler":doctorController.Update,"type":"post","auth":true},
    "/doctor/account/":{"handler":doctorController.GetAccount,"type":"get","auth":false}
};