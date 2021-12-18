import { DataTypes } from 'sequelize';
import { sequelize } from '../';

const team = sequelize.define(
  'team',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
	  defaultValue: DataTypes.UUIDV4
    },
    lead_name: {
      type: DataTypes.STRING,
    }
  }
);

export default team;