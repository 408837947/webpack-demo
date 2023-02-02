const name = (params) => {
  const p = params ?? 12344;
  return `liu${p}`;
  console.log(123);
};

/*
* 腾讯面试题
* 异步执行一个函数
* 如果可以，尽量将函数放入到微队列中
* @param {Function} func 无参数，无返回
*/
const asyncRun = (func) => {
  if (typeof Promise !== 'undefined') {
    Promise.resolve(func);
  } else if (typeof MutationObserver !== 'undefined') {
    // eslint-disable-next-line
    const ob = new MutationObserver(func);
    // eslint-disable-next-line
    const textNode = document.createTextNode('0');
    ob.observe(textNode, {
      characterData: true,
    });
    textNode.data = '1';
  } else {
    setTimeout(func);
  }
};
export {name,asyncRun}