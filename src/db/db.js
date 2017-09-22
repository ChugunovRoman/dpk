import Config from './../config';
import Sequelize from 'sequelize';

// const sequelize = new Sequelize(`mysql://${Config.mysql.user}:${Config.mysql.password}@${Config.mysql.host}/${Config.mysql.database}`);
const sequelize = new Sequelize(
    Config.mysql.database,
    Config.mysql.user,
    Config.mysql.password,
    {
        host: Config.mysql.host,
        dialect: 'mysql',

        pool: {
            min: 0,
            max: 4,
            idle: 10000
        }

    }

);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

console.log('db.js, sequelize: ', sequelize);

export default sequelize;
