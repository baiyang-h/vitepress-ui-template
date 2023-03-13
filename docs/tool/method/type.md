# 类型判断

常用的类型判断方法

## 字符串

```js
export const isString = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}
```

## 数字

```js
export const isNumber = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}
```

## 布尔值

```js
export const isBoolean = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
}
```

## 函数

```js
export const isFunction = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}
```

## null

```js
export const isNull = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
}
```

## undefined

```js
export const isUndefined = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
}
```

## 对象

```js
export const isObj = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}
```

## 数组

```js
export const isArray = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}
```

## 时间

```js
export const isDate = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
}
```

## 正则

```js
export const isRegExp = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
}
```

## 错误对象

```js
export const isError = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
}
```

## Symbol函数

```js
export const isSymbol = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
}
```

## Promise对象

```js
export const isPromise = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
}
```

## Set对象

```js
export const isSet = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}
```

## undefined || null

判断给定变量是否是未定义，当变量值为 null时，也会认为其是未定义

```js
export const isUndef = (v) => {
  return v === undefined || v === null
}
```

## !(undefined || null)

判断给定变量是否是定义，当变量值为 null时，也会认为其是未定义

```js
export const isDef = (v) => {
  return v !== undefined && v !== null
}
```

## 原始类型值

判断给定变量是否是原始类型值，即：string、number、boolean以及 symbol

```js
export const isPrimitive  = (value) => {
  return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'symbol' ||
      typeof value === 'boolean'
  )
```