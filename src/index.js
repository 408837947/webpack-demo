/**
 * webpack入口文件
 */
// polyfill会转译所有的新语法
// import '@babel/polyfill'

// 引入样式文件
import '@/assets/css/index.scss';
import { name } from '@/assets/js/public';

const showMsg = () => {
  // eslint-disable-next-lint
  alert(name());
};
// eslint-disable-next-lint
window.showMsg = showMsg;
