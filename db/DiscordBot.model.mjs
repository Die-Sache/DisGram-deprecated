const DiscordBot = (sequelize, DataTypes) => sequelize.define('DiscordBot', {
    token: {
        type: DataTypes.STRING,
    }
}, {
});

export default DiscordBot;
