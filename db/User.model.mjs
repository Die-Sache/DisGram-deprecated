const User = (sequelize, DataTypes) => sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
}, {
});

export default User;
