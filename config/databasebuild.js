const dbconfig=require("../config/db.js");
const Seq=require("sequelize");
const sequelize=new Seq(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,
    {
        host:dbconfig.HOST,
        dialect:dbconfig.dialect,
        operatorAliases:false,
        pool:{
            max:dbconfig.pool.max,
            min:dbconfig.pool.min,
            acquire:dbconfig.pool.acquire,
            idle:dbconfig.pool.idle,
        }
    }
);
sequelize.authenticate().catch((error)=>{
    console.log(error);
});
const db={
    Seq:Seq,
    seq:sequelize
};
db.doctors=require("../models/doctor.js")(sequelize,Seq.DataTypes);
db.patients=require("../models/patients.js")(sequelize,Seq.DataTypes);
db.appointment=require("../models/appointment.js")(sequelize,Seq.DataTypes);
module.exports=db;