const db = require('../utils/db');
const Auth = require('./Auth');

const User = db.defineModel('user', {
  name: {
    type: db.STRING(255),
    unique: true,
  },
  password: db.STRING(255),
});

User.hasOne(Auth, { foreignKey: 'userId', as: 'auth' });

module.exports = User;
