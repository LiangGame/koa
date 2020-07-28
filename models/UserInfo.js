const sequelize = require('sequelize');
const db = require('../common/db');
const Product = require('./Product');

module.exports = db.defineModel('user-info', {
  name: {
    type: sequelize.STRING,
    comment: '用户名称',
  },
  phoneNumber: {
    type: sequelize.STRING(11),
    comment: '手机号',
  },
  hasCar: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '是否已有车辆:0否,1是',
  },
  intent: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '购买意向:0无,1有',
  },
  status: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '状态',
  },
  productId: {
    type: sequelize.STRING(50),
    allowNull: false,
    comment: '产品Id,product',
    references: {
      model: Product,
      key: 'id',
      deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
});
