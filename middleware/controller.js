// 先导入fs模块，然后用readdirSync列出文件
const fs = require('fs');
const path = require('path');

function addMapping (router, mapping) {
  // router.prefix('/api');
  for (const url in mapping) {
    if (url.startsWith('GET ')) {
      // 如果url类似"GET xxx":
      const path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      // 如果url类似"POST xxx":
      const path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else {
      // 无效的URL:
      console.log(`invalid URL: ${url}`);
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
