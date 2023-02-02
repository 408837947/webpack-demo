/**
 * webpack入口文件
 */
// polyfill会转译所有的新语法
// import '@babel/polyfill'

// 引入样式文件
import '@/assets/css/index.scss';
import { name } from '@/assets/js/public';
// 以模块的方式引入图片
// import boy from '@/assets/icon/xph.gif'
import blackIcon from '@/assets/icon/blank.png'
import eyeIcon from '@/assets/icon/eye.png'

const showMsg = () => {
  // eslint-disable-next-lint
  alert(name());
};
// eslint-disable-next-lint
window.showMsg = showMsg;


// eslint-disable-next-lint
// const img = new Image()
// img.src = boy
// // eslint-disable-next-lint
// document.body.append(img)

// eslint-disable-next-lint
const img1 = new Image()
img1.src = blackIcon
// eslint-disable-next-lint
document.body.append(img1)

// eslint-disable-next-lint
const img2 = new Image()
img2.src = eyeIcon
// eslint-disable-next-lint
document.body.append(img2)

console.log('接口地址',API_BASE_API)