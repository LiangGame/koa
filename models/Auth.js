const db = require('../utils/db');

module.exports = db.defineModel('use_auth', {
  userId: {
    type: db.STRING(255),
    primaryKey: true,
  },
  auth: db.TEXT(),
});
