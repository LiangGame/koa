const Joi = require('@hapi/joi');
const crypto = require('crypto');
const { validate, salt } = require('../common');
const code = require('../common/codeStatus');
const APIError = require('../middleware/rest').APIError;

const auth = (pathPrefix) => {
  return async (ctx, next) => {
    pathPrefix = pathPrefix || '/api';
    if (ctx.request.path.startsWith(pathPrefix)) {
      const { body, path } = ctx.request;
      const authParams = {
        timestamp: body.timestamp,
        token: body.token,
      };
      // 参数校验
      const data = validate(ctx, authParams, Joi.object({
        timestamp: Joi.number().required(),
        token: Joi.string().required(),
      }));
      if (!data.error) {
        // 生产环境验证时间戳和token是否有效
        if (process.env.NODE_ENV === 'production') {
          const timestamp = Date.now();
          const minTimestamp = timestamp - 30 * 1000;
          const maxTimestamp = timestamp + 30 * 1000;
          // 时间戳前后30s内有效
          if (authParams.timestamp < minTimestamp || authParams.timestamp > maxTimestamp) {
            ctx.rest({ success: false, code: code.authError, errorMessage: '无效的timestamp' });
            return;
          }
          // 验证token是否有效
          const [prefix, controller, method] = path.split('/').slice(1);
          const md5 = crypto.createHash('md5');
          const sourceToken = controller + salt + method + body.timestamp + prefix;
          // console.log(sourceToken);
          const token = md5.update(sourceToken).digest('hex');
          if (token !== authParams.token) {
            ctx.rest({ success: false, code: code.authError, errorMessage: '无效的token' });
            return;
          }
        }
        await next();
      }
    } else {
      await next();
    }
  };
};

module.exports = auth;
