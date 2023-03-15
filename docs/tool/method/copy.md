# 复制

文本、图片等复制方案

## 文本复制

### 方法a

使用`document.execCommand(v)`进行复制

```js
// 方法1
export const copy = (value) => {
  var textArea = document.createElement("textarea");
  textArea.style.background = 'transparent';
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    var successful = document.execCommand('copy');
  } catch (err) {
    console.log('Oops, unable to copy');
  }
  document.body.removeChild(textArea);
}
```

```js
// 方法2
export const copy = (text) => {
  return new Promise((resolve, reject) => {
    try {
      let input  = document.createElement('input');
      input.value = text //修改文本框的内容

      document.body.appendChild(input);
      input.select(); // 选中文本
      document.execCommand("copy");
      document.body.removeChild(input);
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}
```

### 方法b

也可以选择相关的依赖包，比如下载 `vue-clipboard2`
```bash
npm install vue-clipboard2
```

### 方案c

使用 `Clipboard.writeText()` api
```js
async function copyText(value) {
  const clipboardObj = navigator.clipboard;
  if(!clipboardObj) {
    return console.log('当前浏览器不支持Clipboard Api')
  }
  try {
    await navigator.clipboard.writeText(value);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}
```

## 文本+图片复制

### 案例1

使用 `Clipboard.write(ClipboardItem)` 方法，如下例子
```js
async function copy() {
  const clipboardObj = navigator.clipboard;
  if(!clipboardObj) {
    return console.log('当前浏览器不支持复制图片')
  }
  const image = await fetch('https://dummyimage.com/300.png');
  // const blob = await image.blob();
  // [blob.type]: blob
  const text = new Blob(['我是文本我是文本'], {type: 'text/plain'});  // 也可以{type: 'text/html'}
  const item = new ClipboardItem({
    'text/plain': text,
    'image/png': image
  });
  await navigator.clipboard.write([item]);
}
```

### 案例2
```js
const copyTextBtn = document.getElementById("copy-text-btn");
const copyImgBtn = document.getElementById("copy-img-btn");

// 复制文本
copyTextBtn.addEventListener("click", () => {
  const text = document.getElementById("text-to-copy").value;

  navigator.clipboard.writeText(text).then(() => {
    console.log("Text copied to clipboard");
  }).catch((error) => {
    console.error("Failed to copy text: ", error);
  });
});

// 复制图片
copyImgBtn.addEventListener("click", () => {
  const imgUrl = document.getElementById("img-to-copy").src;

  fetch(imgUrl)
    .then((response) => response.blob())
    .then((imageBlob) => {
      navigator.clipboard.write([
        new ClipboardItem({
          "image/png": imageBlob
        })
      ]).then(() => {
        console.log("Image copied to clipboard");
      }).catch((error) => {
        console.error("Failed to copy image: ", error);
      });
    });
});

```

### 方案b

使用相关依赖包 `clipboard.js` 库，[传送门](https://clipboardjs.com/#example-text)

## 参考

更多案例 [我的语雀](https://www.yuque.com/honghuaqi/zx2d4b/fqwo56knkfa4h03t)