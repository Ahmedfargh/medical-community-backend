module.exports=(Sequelize,DataTypes)=>{
    const appointment=Sequelize.define("appoint",{
        date:{
            type:DataTypes.DATE,
            default :new Date().getDate()
        },
    });
    appointment.associate=models=>{
        appointment.belongsTo(models.doctor,{
            onDelete:"cascade",
            onUpdate:"cascade"
        });
        appointment.belongsTo(models.patient,{
            onDelete:"cascade",
            onUpdate:"cascade"
        });
    };
    return appointment;
};