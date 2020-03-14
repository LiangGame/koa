const model = require('../utils/model');
const APIError = require('../middleware/rest').APIError;

const fn_index = async (ctx, next) => {
  const Study = model.Study;
  const user = await Study.create({
    content: 'John',
  });
  if (user !== null) {
    ctx.rest(user);
  } else {
    throw new APIError('product:not_found', 'product not found by id.');
  }
};

module.exports = [
  {
    method: 'GET',
    path: '/api/',
    fun: fn_index,
  },
];
