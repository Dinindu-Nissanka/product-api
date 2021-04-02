import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index';

export interface BrandAttributes {
  id: string;
  name: string;
}

type BrandInstance = Model<BrandAttributes>;

const BrandModel = sequelize.define<BrandInstance>('Brand', {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
});

export default BrandModel;
