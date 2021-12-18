import fs from 'fs';
import path from 'path';
const basename = path.basename(__filename);
import { Sequelize } from 'sequelize';
import dbConfig from '../dbconfig/dbconnector';

const config:any = {
	host: dbConfig.db_host,
	// port: dbConfig.db_port,
	dialect: 'postgres',
	operatorsAliases: 0,
	define: {
		freezeTableName: false,
		underscored: true,
		undesrcoredAll: true,
		timestamps: true,
	},
	pool: {
		max: dbConfig.db_pool.max,
		min: dbConfig.db_pool.min,
		acquire: dbConfig.db_pool.acquire,
		idle: dbConfig.db_pool.idle,
	},
	logging: function (str) {
		// console.log(sequelizeLogger(str) + '\n');
	},
};
const sequelize:any = process.env.DATABASE_URL
	? new Sequelize(process.env.DATABASE_URL, config)
	: new Sequelize(dbConfig.db_name, dbConfig.db_user_name, dbConfig.db_password, config);

const db:any = {};
fs.readdirSync(path.join(__dirname, 'models'))
	.filter((file) => {
		return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, 'models', file));
		db[model.name] = model;
		sequelize.fn()
	});

Object.keys(db).forEach((modelName, i) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// export default sequelize;
export { Sequelize, sequelize, db };