const moment = require('moment');
const sequelize = require('sequelize');
const db = require('../common/db');

module.exports = db.defineModel('prize', {
  name: {
    type: sequelize.STRING,
    comment: '名称',
  },
  count: {
    type: sequelize.INTEGER,
    defaultValue: 0,
    comment: '数量',
  },
  image: {
    type: sequelize.STRING,
    comment: '图片',
  },
  fraction: {
    type: sequelize.INTEGER,
    defaultValue: 0,
    comment: '中奖概率(百分比)',
  },
  sort: {
    type: sequelize.INTEGER,
    defaultValue: 0,
    comment: '排序(升序)',
  },
  validTime: {
    type: sequelize.DataTypes.DATE,
    comment: '失效时间',
    get () {
      return moment(this.getDataValue('validTime')).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  online: {
    type: sequelize.INTEGER,
    defaultValue: 0,
    comment: '上下架:0下架,1上架',
  },
  del: {
    type: sequelize.INTEGER,
    defaultValue: 0,
    comment: '删除:0否,1是',
  },
});
