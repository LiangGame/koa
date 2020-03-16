const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { authExpireTime } = require('../utils/config');

class Jwt {
  constructor (data) {
    this.data = data || '';
    this._id = null; // 用户自定义 存放userid
    this._date = null; // 过期时间
    this._creatDate = null; // 创建时间
  }

  // 重新生成 token
  refreshToken () {
    const data = this.data;
    const created = Math.floor(Date.now() / 1000);
    const cert = fs.readFileSync(path.join(__dirname, '../pem/private_key.pem'));// 私钥 可以自己生成
    const token = jwt.sign({
      data,
      exp: created + authExpireTime, // 过期时间
      iat: created, // 创建时间
    }, cert, { algorithm: 'RS256' });
    return token;
  }

  // 生成token
  generateToken (_data) {
    if (_data) {
      this.data = _data;
    }
    const data = this.data;
    const created = Math.floor(Date.now() / 1000);
    const cert = fs.readFileSync(path.join(__dirname, '../pem/private_key.pem'));// 私钥 可以自己生成
    const token = jwt.sign({
      data,
      exp: created + 60 * 30, // 过期时间 30 分钟
      iat: created, // 创建时间
    }, cert, { algorithm: 'RS256' });
    return token;
  }

  // 校验token
  verifyToken (data) {
    if (data) {
      this.data = data;
    }
    const token = this.data;
    const cert = fs.readFileSync(path.join(__dirname, '../pem/public_key.pem'));// 公钥 可以自己生成
    let res;
    try {
      const result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {};
      this._id = result.data;
      this._date = result.exp;
      this._creatDate = result.iat;
      const { exp = 0 } = result;
      const current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      }
    } catch (e) {
      console.log(e);
      res = 'err';
    }
    return res;
  }
};

module.exports = new Jwt();
