const Joi = require('joi');
const jwt = require('../utils/jwt');
const userDao = require('../dao/userDao');
const { authExpireTime } = require('../utils/config');
const { SILENT, WARN_MESSAGE, ERROR_MESSAGE, ERROR_PARAMS } = require('../utils/codeStatus');

const login = async (ctx, next) => {
  const data = ctx.validate(ctx.request, {
    name: Joi.string().min(3).max(20).required().error(errors => {
      console.log(errors);

      return errors;
    }),
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
        const expireTime = Date.now() + authExpireTime * 1000;

        ctx.cookies.set('userId', user.id, {
          maxAge: authExpireTime * 1000,
          expires: new Date(expireTime),
          signed: false,
        });
        ctx.rest({ success: true, showType: SILENT, data: { msg: '登录成功' } });
      } else {
        ctx.rest({ success: true, showType: WARN_MESSAGE, data: { msg: '密码错误' } });
      }
    } else {
      ctx.rest({ success: true, errorCode: ERROR_PARAMS, data: [{ message: '用户不存在', key: 'name' }] });
    }
  }
};

const register = async (ctx, next) => {
  const user = await userDao.register(ctx.request.body);

  if (user) {
    ctx.rest({ success: true, showType: SILENT, data: { userId: user.id } });
  } else {
    ctx.rest({ success: true, showType: ERROR_MESSAGE, data: { msg: '注册失败' } });
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
