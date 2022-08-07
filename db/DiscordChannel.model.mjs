const DiscordChannel = (sequelize, DataTypes) => sequelize.define('DiscordChannel', {
    name: {
        type: DataTypes.STRING,
    }
}, {
});

export default DiscordChannel;
