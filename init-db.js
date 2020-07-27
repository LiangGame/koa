const model = require('./models/index.js');

model.sync.then(() => {
  console.log('init db ok.');

  process.exit(0);
}).catch((e) => {
  console.log(`failed:${e}`);

  process.exit(0);
});
