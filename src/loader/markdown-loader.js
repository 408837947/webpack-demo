const { marked } = require('marked');
// 导出函数
module.exports = function (source) {
  // 获取loader的配置项
  const options = this.query || {};
  console.log('loader配置项', options);
  // return 'console.log("my loader")'

  const html = marked(source);

  // 直接返回可能因为引号的问题导致报错
  // return `module.exports = ${html}`

  return `module.exports = ${JSON.stringify(html)}`;
};
