const Joi = require('@hapi/joi');
const jwt = require('../utils/jwt');
const userDao = require('../dao/userDao');

const login = async (ctx, next) => {
  const data = ctx.validate(ctx.request.body, {
    name: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
  });
  if (!data.error) {
    const { password } = ctx.request.body;
    const user = await userDao.login(ctx.request.body);
    if (user) {
      if (user.password === password) {
        const token = jwt.generateToken(user.id);
        ctx.session.token = token;
        await userDao.updateToken(user.id, token);
        ctx.cookies.set('userId', user.id);
        ctx.rest.success({ msg: '登录成功' });
      } else {
        ctx.rest.success({ msg: '密码错误' });
      }
    } else {
      ctx.rest.success({ msg: '用户不存在' });
    }
  }
};

const register = async (ctx, next) => {
  const user = await userDao.register(ctx.request.body);

  if (user) {
    ctx.rest.success({ data: { id: user.id } });
  } else {
    ctx.rest.error({ msg: '创建失败' });
  }
};

module.exports = [
  {
    method: 'POST',
    path: '/login',
    fun: login,
  },
  {
    method: 'POST',
    path: '/register',
    fun: register,
  },
];
