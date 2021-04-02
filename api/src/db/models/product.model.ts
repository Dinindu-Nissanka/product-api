import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index';
import BrandModel, { BrandAttributes } from './brand.model';

export interface ProductAttributes {
  id: string;
  name: string;
  slug: string;
  sku: string;
  createdAt?: Date;
  updatedAt?: Date;
  brandId?: string;
  brand?: BrandAttributes;
}

type ProductInstance = Model<ProductAttributes>;

const ProductModel = sequelize.define<ProductInstance>('Product', {
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
  slug: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  sku: {
    allowNull: false,
    type: DataTypes.UUID,
  },
});

ProductModel.belongsTo(BrandModel, {
  foreignKey: 'brandId',
  as: 'brand',
});

export default ProductModel;
