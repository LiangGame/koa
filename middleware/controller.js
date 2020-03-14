// 先导入fs模块，然后用readdirSync列出文件
const fs = require('fs');
const path = require('path');

function addMapping (router, mapping) {
  for (const i in mapping) {
    const { method, path: _path, fun } = mapping[i];

    switch (method) {
      case 'GET':
        router.get(_path, fun);
        console.log(`register URL mapping: GET ${_path}`);
        break;
      case 'POST':
        router.post(_path, fun);
        console.log(`register URL mapping: POST ${_path}`);
        break;
      default:
        console.log(`invalid URL: ${_path}`);
    }
  }
}

function addControllers (router) {
  // 这里可以用sync是因为启动时只运行一次，不存在性能问题:
  const files = fs.readdirSync(path.resolve(__dirname, '../controllers'));
  // 过滤出.js文件:
  const js_files = files.filter((f) => {
    return f.endsWith('.js');
  });

  for (const f of js_files) {
    console.log(`process controller: ${f}...`);
    const mapping = require(path.resolve(__dirname, '../controllers/' + f));
    addMapping(router, mapping);
  }
}

module.exports = function (dir) {
  const controllers_dir = dir || 'controllers'; // 如果不传参数，扫描目录默认为'controllers'
  const router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};
