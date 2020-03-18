const Joi = require('joi-i18n');
const zh_CN = require('../utils/local/zh_CN');
const { ERROR_PARAMS } = require('../utils/codeStatus');

async function validate (ctx, next) {
  ctx.validate = (req, obj) => {
    Joi.addLocaleData('zh_CN', zh_CN);

    const data = {
      ...req.query,
      ...req.body,
    };
    const schema = Joi.object().keys({
      ...obj,
      timeStamp: Joi.number().min(13).required(),
      token: Joi.string().min(32).required(),
    });

    const result = schema.validate(data, { abortEarly: false, locale: 'zh_CN' });

    if (result.error) {
      const errorList = [];
      for (let i = 0; i < result.error.details.length; i++) {
        const error = result.error.details[i];
        errorList.push({
          key: error.context.label,
          message: error.message,
        });
      }
      ctx.rest({
        success: true,
        errorCode: ERROR_PARAMS,
        errorMessage: result.error.message,
        data: errorList,
      });
    }
    return result;
  };
  await next();
};

module.exports = validate;
