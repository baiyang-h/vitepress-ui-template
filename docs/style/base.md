# 基础

构建项目初始化项目时，可以设置基础样式，方便整个项目中使用，不需要再重新定义

## 字体大小

```scss
@for $i from 12 to 20 {
  .u-font-#{$i} {
    font-size: $i + px;
  }
}
```

## 内外边距

```scss
// 定义内外边距，历遍1-80
@for $i from 0 through 80 {
  // 只要双数和能被5除尽的数
  @if $i % 2 == 0 or $i % 5 == 0 {
    // 如：u-margin-30或者u-m-30
    .u-margin-#{$i}, .u-m-#{$i} {
      margin: $i + rpx!important;
    }

    // 如：u-padding-30或者u-p-30
    .u-padding-#{$i}, .u-p-#{$i} {
      padding: $i + rpx!important;
    }

    @each $short, $long in l left, t top, r right, b bottom {
      // 缩写版，结果如： u-m-l-30
      // 定义外边距
      .u-m-#{$short}-#{$i} {
        margin-#{$long}: $i + rpx!important;
      }

      // 定义内边距
      .u-p-#{$short}-#{$i} {
        padding-#{$long}: $i + rpx!important;
      }

      // 完整版，结果如：u-margin-left-30
      // 定义外边距
      .u-margin-#{$long}-#{$i} {
        margin-#{$long}: $i + rpx!important;
      }

      // 定义内边距
      .u-padding-#{$long}-#{$i} {
        padding-#{$long}: $i + rpx!important;
      }
    }
  }
}
```

## :root

整个项目设置全局样式变量，在项目任何地方可以使用 `var(--bg-color)` 的方式使用变量

```css
:root {
  --el-color-success: #67c23a;
  --success-color: var(--el-color-success);
}
```
使用
```css
.a {
  color: var(--success-color);
}
```
