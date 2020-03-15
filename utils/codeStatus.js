const codeStatus = {
  success: 0, // 成功
  error: 400, // 错误
  paramsError: 1, // 参数检验错误
};

const codeMsg = {
  success: 'success', // 成功
  error: 'error', // 错误
  paramsError: '参数错误',
};

module.exports = {
  codeStatus,
  codeMsg,
};
