const model = require('../utils/model');

const User = model.User;
const Auth = model.Auth;

const userDao = {
  login: async (data) => {
    const { name } = data;
    const user = await User.findOne({ where: { name } });
    return user;
  },
  register: async (data) => {
    const { name, password } = data;
    const user = await User.create({ name, password });
    return user;
  },
  queryByUserIdToken: async (userId) => {
    const authToken = await Auth.findOne({
      where: { userId },
    });
    return authToken;
  },
  createToken: async (userId, token) => {
    const authToken = await Auth.create({ userId, auth: token });
    return authToken;
  },
  updateToken: async (userId, token) => {
    const authToken = await userDao.queryByUserIdToken(userId);
    console.log(JSON.stringify(authToken));
    if (authToken) {
      authToken.auth = token;
      const update = await authToken.save();
      return update;
    } else {
      const _token = await userDao.createToken(userId, token);
      return _token;
    }
  },
};

module.exports = userDao;
