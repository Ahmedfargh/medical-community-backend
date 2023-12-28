module.exports = (Sequelize, DataTypes) => {
    const messages = Sequelize.define("messages", {
        time: {
            type: DataTypes.DATE,
            default: new Date().getTime(),
        },
        message: {
            type: DataTypes.STRING(512),
        },
        sender_type: {
            type: DataTypes.INTEGER,
        },

    });
    messages.associate = models => {
        messages.belongsTo(models.session, {
            onDelete: "cascade",
            onUpdate: "cascade"
        });
    };
    return messages;
};