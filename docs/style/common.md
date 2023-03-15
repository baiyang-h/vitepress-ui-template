# 通用样式

一些常用的通用样式

## 浮动相关

```css
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix:after {
  content:"200B";
  display: block;
  height:0;
  font-size:0;
  clear: both;
}
.clearfix {
  zoom: 1;
}
```

## 文本超出使用省略号\文本行数限制

文本行数限制，超出部分会变省略号，默认只显示1行
```css
.u-line-1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.u-line-2 {
  -webkit-line-clamp: 2;
}

.u-line-3 {
  -webkit-line-clamp: 3;
}

.u-line-4 {
  -webkit-line-clamp: 4;
}

.u-line-5 {
  -webkit-line-clamp: 5;
}

.u-line-2, .u-line-3, .u-line-4, .u-line-5 {
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; // 弹性伸缩盒
  -webkit-box-orient: vertical; // 设置伸缩盒子元素排列方式
}
```

## 滚动条样式

```scss
.div {
  &::-webkit-scrollbar {
    /*高宽分别对应横竖滚动条的尺寸*/
    cursor: pointer;
    width: 6px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    background: #d8d8d8;
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 0;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #c8c8c8;
  }
}
```