const codeStatus = {
  SILENT: 0, // 不提示错误
  WARN_MESSAGE: 1, // 警告信息提示
  ERROR_MESSAGE: 2, // 错误信息提示
  NOTIFICATION: 4, // 通知提示
  REDIRECT: 9, // 页面跳转
  // errorCode
  ERROR_EXPIRED: 1000, // 过期的用户Token
  ERROR_EXPIRED_AUTH: 1001, // 过期Token
  ERROR_PARAMS: 1002, // 参数错误
};

module.exports = codeStatus;
