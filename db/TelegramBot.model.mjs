const TelegramBot = (sequelize, DataTypes) => sequelize.define('TelegramBot', {
    token: {
        type: DataTypes.STRING,
    }
}, {
});

export default TelegramBot;
