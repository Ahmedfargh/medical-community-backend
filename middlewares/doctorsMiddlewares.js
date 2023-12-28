const jwt=require("jsonwebtoken");
const config = require("../config/config.json");
module.exports={
    isOwner:function(req,res,next){
        try{
            var account=jwt.verify(req.body.token,config.scure.private);
            next();
        }catch(error){
            return res.status(401).json({
                status:0,
                message:"auth failed"
            });
        }
    }
};