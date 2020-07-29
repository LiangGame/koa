const APIError = require('../middleware/rest').APIError;
const { validate, getBody, salt } = require('../common');
const Joi = require('@hapi/joi');
const model = require('../models/index');
const code = require('../common/codeStatus');
const crypto = require('crypto');

const prefix = '/api/user';

module.exports = {
  [`POST ${prefix}/register`]: async (ctx, next) => {
    const { body } = ctx.request;
    const params = getBody(body);
    const data = validate(ctx, params, Joi.object({
      userName: Joi.string().min(3).max(20).required(),
      phoneNumber: Joi.string().min(11).max(20).required(),
      password: Joi.string().min(6).required(),
    }));
    if (data.error) return;
    const md5 = crypto.createHash('md5');
    const password = md5.update(salt + params.password).digest('hex');
    try {
      const user = await model.User.create({
        ...params,
        password,
      });
      ctx.rest({ success: true, code: code.success, data: user.id });
    } catch (e) {
      ctx.rest({ success: false, code: code.serverError, errorMessage: e.message });
    }
  },

  'POST /api/products': async (ctx, next) => {
    ctx.rest('ok');
  },

  'DELETE /api/products/:id': async (ctx, next) => {
    console.log(`delete product ${ctx.params.id}...`);
    var p = 0;
    if (p) {
      ctx.rest(p);
    } else {
      throw new APIError('product:not_found', 'product not found by id.');
    }
  },
};
