const { codeStatus, codeMsg } = require('../common/codeStatus');

module.exports = {
  APIError: function (code, message) {
    this.code = code || 'internal:unknown_error';
    this.message = message || '';
  },
  restify: (pathPrefix) => {
    // REST API前缀，默认为/api/:
    pathPrefix = pathPrefix || '/api/';
    return async (ctx, next) => {
      // 是否是REST API前缀?
      if (ctx.request.path.startsWith(pathPrefix)) {
        // 绑定rest()方法:
        ctx.rest = {
          success: (data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
              code: codeStatus.success,
              msg: codeMsg.success,
              ...data,
            };
          },
          error: (data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
              code: codeStatus.error,
              msg: codeMsg.error,
              ...data,
            };
          },
          paramsError: (data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
              code: codeStatus.paramsError,
              msg: codeMsg.paramsError,
              ...data,
            };
          },
        };
        await next();
      } else {
        await next();
      }
    };
  },
};
