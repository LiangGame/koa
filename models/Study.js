const db = require('../utils/db');

module.exports = db.defineModel('table', {
  content: db.STRING(255),
});
