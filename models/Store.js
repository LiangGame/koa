const sequelize = require('sequelize');
const db = require('../common/db');

module.exports = db.defineModel('store', {
  name: {
    type: sequelize.STRING,
    comment: '门店名称',
  },
  lng: {
    type: sequelize.STRING,
    comment: '经度',
  },
  lat: {
    type: sequelize.STRING,
    comment: '纬度',
  },
  phoneNumber: {
    type: sequelize.STRING(11),
    comment: '联系电话',
  },
  userName: {
    type: sequelize.STRING(50),
    comment: '联系人',
  },
  del: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '删除:0否,1是',
  },
});
