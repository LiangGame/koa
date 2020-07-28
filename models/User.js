const sequelize = require('sequelize');
const db = require('../common/db');

module.exports = db.defineModel('user', {
  userName: {
    type: sequelize.STRING,
    comment: '用户名称',
  },
  phoneNumber: {
    type: sequelize.STRING(11),
    comment: '手机号',
  },
  password: {
    type: sequelize.STRING,
    comment: '密码',
  },
  status: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '状态:0正常,1冻结',
  },
  type: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '类型:0代理商,1管理员',
  },
  del: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '删除:0否,1是',
  },
});
