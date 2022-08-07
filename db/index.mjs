import TelegramChannel from "./TelegramChannel.model.mjs";
import DiscordBot from "./DiscordBot.model.mjs";
import TelegramBot from "./TelegramBot.model.mjs";
import DiscordChannel from "./DiscordChannel.model.mjs";
import Sequelize from "sequelize";
import dbConfig from "../config/db.config.mjs";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.TelegramChannel = TelegramChannel(sequelize, Sequelize);
db.DiscordBot = DiscordBot(sequelize, Sequelize);
db.TelegramBot = TelegramBot(sequelize, Sequelize);
db.DiscordChannel = DiscordChannel(sequelize, Sequelize);

db.TelegramBot.hasMany(db.TelegramChannel);
db.TelegramChannel.belongsTo(db.TelegramBot);

db.DiscordBot.hasOne(db.DiscordChannel);
db.DiscordChannel.belongsTo(db.DiscordBot);

export default db;

