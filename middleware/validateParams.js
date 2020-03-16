const Joi = require('@hapi/joi');

async function validate (ctx, next) {
  ctx.validate = (data, obj) => {
    const schema = Joi.object({
      ...obj,
      timeStamp: Joi.number().min(13).required(),
      token: Joi.string().min(32).required(),
    });
    const result = schema.validate(data);
    if (result.error) {
      // 出错可创建自定义的校验出错类型
      ctx.rest.paramsError({ error: result.error.message });
    }
    return result;
  };
  await next();
};

module.exports = validate;
