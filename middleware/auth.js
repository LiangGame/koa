const jwt = require('../utils/jwt');
const mcache = require('memory-cache');
const crypto = require('crypto');
const userDao = require('../dao/userDao');
const { ERROR_EXPIRED, ERROR_EXPIRED_AUTH } = require('../utils/codeStatus');

const authToken = async (ctx, next) => {
  if (ctx.url.includes('/authapi')) {
    if (ctx.session.token) {
      const valid = jwt.verifyToken(ctx.session.token);
      console.log('valid', valid);
      if (valid !== ctx.cookies.get('userId')) {
        ctx.rest({ success: true, errorCode: ERROR_EXPIRED, errorMessage: '登录态与当前用户不一致' });
      } else if (valid === 'err') {
        ctx.rest({ success: true, errorCode: ERROR_EXPIRED, errorMessage: '登录态已过期' });
      } else {
        const token = await userDao.queryByUserIdToken(ctx.cookies.get('userId'));
        console.log(token.auth);
        console.log(ctx.session.token);
        if (token.auth !== ctx.session.token) {
          ctx.rest({ success: true, errorCode: ERROR_EXPIRED, errorMessage: '当前账号已在别处登录' });
        } else {
          await next();
        }
      }
    } else {
      ctx.rest({ success: true, errorCode: ERROR_EXPIRED, errorMessage: '未登录' });
    }
  } else {
    await next();
  }
};

const authApi = async (ctx, next) => {
  const { timeStamp, token } = ctx.request.query;
  const { pathname } = ctx.req._parsedUrl;
  const content = pathname + timeStamp + 'D840BC6A06A94E30';
  const _token = crypto.createHash('md5').update(content).digest('hex');
  const cachedBody = mcache.get(pathname);

  if (Date.now() - timeStamp > 20000 || Date.now() < timeStamp) {
    ctx.rest({ success: true, errorCode: ERROR_EXPIRED_AUTH, errorMessage: 'token已过期或timeStamp无效' });
  } else if (token !== _token) {
    ctx.rest({ success: true, errorCode: ERROR_EXPIRED_AUTH, errorMessage: '无效的token' });
  } else if (cachedBody === _token) {
    ctx.rest({ success: true, errorCode: ERROR_EXPIRED_AUTH, errorMessage: 'token已失效' });
  } else {
    mcache.put(pathname, _token, 30 * 1000);
    await next();
  }
};

module.exports = {
  authToken,
  authApi,
};
