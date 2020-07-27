const db = require('../common/db');

module.exports = db.defineModel('table', {
  content: db.STRING(255),
  content1: db.STRING(255),
});
