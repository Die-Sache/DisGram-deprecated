const TelegramChannel = (sequelize, DataTypes) => sequelize.define('TelegramChannel', {
    channelId: {
        type: DataTypes.STRING,
    },
    retentionTime: {
        type: DataTypes.INTEGER
    }
}, {
});

export default TelegramChannel;
