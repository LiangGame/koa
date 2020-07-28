const sequelize = require('sequelize');
const db = require('../common/db');

module.exports = db.defineModel('product', {
  name: {
    type: sequelize.STRING,
    comment: '产品名称',
  },
  code: {
    type: sequelize.STRING,
    comment: '产品代码',
  },
  address: {
    type: sequelize.STRING,
    comment: '地址',
  },
  online: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '上下架:0下架,1上架',
  },
  del: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '删除:0否,1是',
  },
});
