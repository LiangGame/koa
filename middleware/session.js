const Koa_Session = require('koa-session');

const session_signed_key = ['some secret hurr']; // 这个是配合signed属性的签名key
const session_config = {
  key: 'token', /**  cookie的key。 (默认是 koa:sess) */
  maxAge: 60000 * 2, /**  session 过期时间，以毫秒ms为单位计算 。 */
  autoCommit: true, /** 自动提交到响应头。(默认是 true) */
  overwrite: false, /** 是否允许重写 。(默认是 true) */
  httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
  signed: false, /** 是否签名。(默认是 true) */
  rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
  renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};

// 实例化
const createSession = (app) => {
  const session = Koa_Session(session_config, app);
  app.keys = session_signed_key;
  return session;
};

module.exports = createSession;
