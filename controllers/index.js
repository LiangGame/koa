const model = require('../utils/model');
const APIError = require('../middleware/rest').APIError;
const Joi = require('joi');
const { SILENT } = require('../utils/codeStatus');

const fn_index = async (ctx, next) => {
  const { name } = ctx.request.query;

  const Study = model.Study;
  const user = await Study.create({
    content: name,
  });
  if (user !== null) {
    ctx.rest({ success: true, showType: SILENT, data: { msg: '请求成功' } });
  } else {
    throw new APIError('product:not_found', 'product not found by id.');
  }
};

const fn_json = async (ctx, next) => {
  const data = ctx.validate(ctx.request, {
    // 账号限制长度为3-20个字符串
    name: Joi.string().min(3).max(20).required(),
  });

  if (!data.error) {
    ctx.rest({ success: true, showType: SILENT, data: data.value });
  }
};

module.exports = [
  {
    method: 'GET',
    path: '/index',
    fun: fn_index,
  },
  {
    method: 'GET',
    path: '/json',
    fun: fn_json,
    auth: true,
  },
];
