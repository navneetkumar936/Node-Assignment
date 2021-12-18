import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '../';
import team from './team';

const company = sequelize.define(
  'company',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
	  defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
    },
    ceo: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    inception_date: {
        type: DataTypes.DATE
    }
  }
);

company.hasMany(team);
team.belongsTo(company);

export default company;