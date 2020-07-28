const sequelize = require('sequelize');
const db = require('../common/db');

module.exports = db.defineModel('activity', {
  name: {
    type: sequelize.STRING,
    comment: '活动名称',
  },
  type: {
    type: sequelize.STRING,
    comment: '活动类型',
  },
  bgImage: {
    type: sequelize.STRING,
    comment: '背景图片',
  },
});
