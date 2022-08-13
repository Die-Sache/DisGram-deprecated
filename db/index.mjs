import TelegramChannel from "./TelegramChannel.model.mjs";
import DiscordBot from "./DiscordBot.model.mjs";
import TelegramBot from "./TelegramBot.model.mjs";
import DiscordChannel from "./DiscordChannel.model.mjs";
import User from "./User.model.mjs";
import Sequelize from "sequelize";
//import dbConfig from "../config/db.config.mjs";

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.DIALECT
// });

const sequelize = new Sequelize(process.env.DATABASE_URL, {} || {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.TelegramChannel = TelegramChannel(sequelize, Sequelize);
db.DiscordBot = DiscordBot(sequelize, Sequelize);
db.TelegramBot = TelegramBot(sequelize, Sequelize);
db.DiscordChannel = DiscordChannel(sequelize, Sequelize);
db.User = User(sequelize, Sequelize);

db.TelegramBot.hasMany(db.TelegramChannel);
db.TelegramChannel.belongsTo(db.TelegramBot);
db.TelegramChannel.belongsTo(db.User);
db.TelegramBot.belongsTo(db.User);

db.DiscordBot.hasOne(db.DiscordChannel);
db.DiscordChannel.belongsTo(db.DiscordBot);
db.DiscordChannel.belongsTo(db.User);
db.DiscordBot.belongsTo(db.User);

db.User.hasMany(db.TelegramBot);
db.User.hasMany(db.DiscordBot);
db.User.hasMany(db.TelegramChannel);
db.User.hasMany(db.DiscordChannel);

export default db;

