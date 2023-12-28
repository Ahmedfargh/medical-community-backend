/*
*here is defineing the doctor
*/
module.exports=(sequelize,DataTypes)=>{
    const doctor=sequelize.define("doctor",{
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:false
        },
        prof:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        paragraph:{
            type:DataTypes.STRING(6000),
        }
    });
     //defineing the relation ships between doctor and appointment he has
    doctor.associate=models=>{
        doctor.hasMany(models.appoint,{
            onDelete:"cascade",
            onUpdate:"cascade"
        });
    };
    return doctor;
};