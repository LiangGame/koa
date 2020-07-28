const moment = require('moment');
const sequelize = require('sequelize');
const db = require('../common/db');
const User = require('./User');
const Prize = require('./Prize');

module.exports = db.defineModel('order', {
  userId: {
    type: sequelize.STRING(50),
    allowNull: false,
    comment: '外键,user-info',
    references: {
      model: User,
      key: 'id',
      deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  code: {
    type: sequelize.STRING,
    comment: '抽奖码',
  },
  isWin: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '是否中奖:0否,1是',
  },
  status: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '是否兑奖:0否,1是',
  },
  goodsId: {
    type: sequelize.STRING(50),
    allowNull: false,
    comment: '奖品Id,prize',
    references: {
      model: Prize,
      key: 'id',
      deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  useTime: {
    type: sequelize.DataTypes.DATE,
    comment: '失效时间',
    get () {
      return moment(this.getDataValue('useTime')).format('YYYY-MM-DD HH:mm:ss');
    },
  },
});
