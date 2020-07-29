const code = require('../common/codeStatus');
const salt = '89D81FBC94E57BD3AA0F32F4CE078C34';

const validate = (ctx, data, schema) => {
  const result = schema.validate(data);
  if (result.error) {
    // 出错可创建自定义的校验出错类型
    ctx.rest({ success: false, code: code.paramsError, error: result.error.message });
  }
  return result;
};

const getBody = (body) => {
  const data = Object.assign({}, body);
  delete data.timestamp;
  delete data.token;
  return data;
};

module.exports = {
  validate,
  getBody,
  salt,
};
