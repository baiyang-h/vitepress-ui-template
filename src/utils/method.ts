// /**
//  * @description 使用a标签的download属性进行直接下载
//  * @param url 文件url
//  * @param name 下载的时候定义文件名
//  */
// export const download = function (url, name) {
//   let eleLink = document.createElement('a');
//   // 写了这句会直接下载下来， 如果a标签没download属性则会在新窗口直接浏览图片
//   eleLink.download = name || '下载';
//
//   eleLink.href = url;
//   eleLink.style.display = 'none';
//
//   document.body.appendChild(eleLink);
//   eleLink.click();
//   document.body.removeChild(eleLink);
// };