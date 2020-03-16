const jwt = require('../utils/jwt');
const mcache = require('memory-cache');
const crypto = require('crypto');

const authToken = async (ctx, next) => {
  if (ctx.url.includes('/authapi')) {
    if (ctx.session.token) {
      const valid = jwt.verifyToken(ctx.session.token);
      console.log('valid', valid);
      if (valid !== ctx.cookies.get('userId')) {
        ctx.rest.error({ msg: '登录态与当前用户不一致' });
      } else {
        await next();
      }
    } else {
      ctx.rest.error({ msg: '未登录' });
    }
  } else {
    await next();
  }
};

const authApi = async (ctx, next) => {
  const { timeStamp, token } = ctx.request.method === 'GET' ? ctx.request.query : ctx.request.body;
  const { pathname } = ctx.req._parsedUrl;
  const content = pathname + timeStamp + 'D840BC6A06A94E30';
  const _token = crypto.createHash('md5').update(content).digest('hex');
  const cachedBody = mcache.get(pathname);

  if (Date.now() - timeStamp > 20000 || Date.now() < timeStamp) {
    ctx.rest.error({ msg: 'token已过期' });
  } else if (token !== _token) {
    ctx.rest.error({ msg: '无效的token' });
  } else if (cachedBody === _token) {
    ctx.rest.error({ msg: 'token已失效' });
  } else {
    mcache.put(pathname, _token, 30 * 1000);
    await next();
  }
};

module.exports = {
  authToken,
  authApi,
};
