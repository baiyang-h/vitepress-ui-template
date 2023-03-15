# 上传

文件上传的方案

## 表单提交

这里主要是请求头中设置 `multipart/form-data`，表示上传的是文件

```html
<form method="post" action="xxxxx" enctype="multipart/form-data">
  选择文件:<input type="file" name="file" />
  <br />
  标题：<input type="text" name="title" />
  <br />
  <button type="submit">提交</button>
</form>
```

## FormData对象上传

创建一个 `FormData` 对象，通过接口上传

### 方式1

```js
var formData = new FormData();

formData.append("username", "Groucho");
formData.append("accountnum", 123456);  //数字 123456 会被立即转换成字符串 "123456"

// HTML 文件类型 input，由用户选择
formData.append("userfile", fileInputElement.files[0]);

// JavaScript file-like 对象
var content = '<a id="a"><b id="b">hey!</b></a>';  // 新文件的正文
var blob = new Blob([content], { type: "text/xml"});
formData.append("webmasterfile", blob);

// 请求1
var request = new XMLHttpRequest();
request.open("POST", "http://foo.com/submitform.php");
request.send(formData);

// 或
// 请求2
$.ajax({
  url: 'http://foo.com/submitform.php',
  type: 'post',
  data: formData,
  success: function (res) {},
})

```

### 方式2

直接使用form dom元素
```html
<form enctype="multipart/form-data" method="post" id="form">
  选择文件:<input type="file" name="file" />
  <br />
  标题：<input type="text" name="title" />
</form>
```
```js
var formElement = document.querySelector("#form");  
var formData = new FormData(formElement);
var request = new XMLHttpRequest();
request.open("POST", "http://foo.com/submitform.php");
formData.append("a", 123);
request.send(formData);
```