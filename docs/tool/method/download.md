# 下载

常用的下载文件、图片等方法

## a标签下载

使用 `a` 标签的 `download` 属性，直接下载。

```js
export const download = function (url, name) {
  let eleLink = document.createElement('a');
  // 写了这句会直接下载下来， 如果a标签没download属性则会在新窗口直接浏览图片
  eleLink.download = name || '下载';
  
  eleLink.href = url;
  eleLink.style.display = 'none';

  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
};
```
::: warning
注意：存在兼容性问题，谷歌浏览器支持相对较好，而且只能下载不能被浏览器打开的文件类型，如图片、文件等，也存在直接在浏览器进行预览的可能，和http协议有关。
:::

## 本地转canvas为DataURL下载

将地址通过本地 `canvas` 转化为 `DataURL` 进行下载，这样可以解决浏览器直接打开预览，没有下载的问题。

```js
/**
 * 主要原理：利用a标签的download属性以及canvas的toDataURL()
 * @param url  地址
 * @param name 被下载图片的命名
 * @param type 图片类型
 */
export const downloadPicture = (url, name, type='image/png') => {
  let image = new Image()
  image.onload = function () {
    // 图片转base64
    function image2base64() {
      // 创建一个canvas标签
      let canvas = document.createElement('canvas')
      // 设置canvas的宽高
      canvas.width = image.width
      canvas.height = image.height
      // 获取canvas的2d界面
      let context = canvas.getContext('2d')
      // 把图片画在canvas上
      context.drawImage(image, 0, 0, image.width, image.height)
      // 把canvas的内容转化为base64格式 DataUrl
      let dataUrl = canvas.toDataURL(type)
      return dataUrl
    }
    const _url = image2base64()
    // 生成一个a元素
    let a = document.createElement('a')
    // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
    a.download = name || '下载图片名称'
    // 将生成的URL设置为a.href属性
    a.href = _url
    // 点击
    a.click()
  }
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous')
  // 获取img上的src值，赋值之后，完成之后会调用onload事件
  image.src = url
}
```

## 通过Form表单下载

```js
function downloadFile(downloadUrl, fileName) {
  // 创建表单
  let form = document.createElement('form')
  form.method = 'get'
  form.action = downloadUrl
  //form.target = '_blank';	// form新开页面
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}
```

## 利用Blob对象下载

通过将返回的格式转为 `blob` 对象

```js
function downdFile(path, name) {
  const xhr = new XMLHttpRequest();
  xhr.open('get', path);
  xhr.responseType = 'blob';
  xhr.send();
  xhr.onload = function () {
    if (this.status === 200 || this.status === 304) {
      const url = URL.createObjectURL(this.response);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
}
```

## imageToBase64、base64ToBlob

```js
// img -> base64
function image2base64() {
  // 创建一个canvas标签
  let canvas = document.createElement('canvas')
  // 设置canvas的宽高
  canvas.width = image.width
  canvas.height = image.height
  // 获取canvas的2d界面
  let context = canvas.getContext('2d')
  // 把图片画在canvas上
  context.drawImage(image, 0, 0, image.width, image.height)
  // 把canvas的内容转化为base64格式 DataUrl
  let dataUrl = canvas.toDataURL(type)
  return dataUrl
}
```
```js
// base64 -> Blob 方式1
function dataUrl2Blob(dataUrl) {
  var arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bStr = atob(arr[1]),
      n = bStr.length,
      unit8Array = new Uint8Array(n);
  while (n--) {
    unit8Array[n] = bStr.charCodeAt(n);
  }
  return new Blob([unit8Array], { type: mime });
}
```
```js
// base64 -> Blob 方式2
function base64ToBlob(base64, mimeType) {
  let bytes = window.atob(base64);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}
```

## 参考

细节、详情、案例等参考 [我的语雀](https://www.yuque.com/honghuaqi/zx2d4b/uf6t49pkw4onk5v1)