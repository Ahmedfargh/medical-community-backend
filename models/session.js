/*
*this approch is to solve the isolated schema problem
*/
module.exports=(sequelize,DataTypes)=>{
    const sessions=sequelize.define("session",{

    });
    sessions.associate=models=>{
        sessions.belongsTo(models.doctor,{
            onDelete:"cascade",
            onUpdate:"cascade"
        });
        sessions.belongsTo(models.patient,{
            onDelete:"cascade",
            onUpdate:"cascade"
        });
    };
    return sessions;
};