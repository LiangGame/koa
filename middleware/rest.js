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
      if (ctx.request.path.startsWith(pathPrefix) || ctx.request.path.startsWith('/authapi/')) {
        // 绑定rest()方法:
        ctx.rest = (data) => {
          ctx.response.type = 'application/json';
          ctx.response.body = data;
        };
        await next();
      } else {
        await next();
      }
    };
  },
};
