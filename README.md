# koa

koa + sequelize + mysql 脚手架

## Step1.创建数据库配置文件
在根目录创建 `dbconfig.js`，内容如下：

```javascript
const config = {
  dialect: 'mysql',
  database: '',
  username: '',
  password: '',
  host: '',
  port: 3306,
};

module.exports = config;
```

## Step2. 安装依赖

## Step3. 本地启动

```shell script
npm start
```