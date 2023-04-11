# 数组相关

项目中数组相关的方法

## 递归数组

递归数组并且可以处理一些字段等

```js
const formatList = (list) => {
  return list.map(item => {
    // TODO 可一些字段处理等
    // ...
    return {
      ...item,
      children: item.children && item.children.length ? formatList(item.children) : item.children
    }
  })
}
```

## 格式化数组&行内处理数据
```js
/**
 * @description 这是一个浅拷贝，可以修改数组中item的数据或增删改属性字段，确保子数组都是在 item.children 中，即确保 children 属性
 * @param list
 * @param cb 函数，存在item, index 两个参数
 * @returns {*} 浅拷贝后 格式化后的新list
 */
const formatData = (list, cb) => {
  return list.map((item, index) => {
    if(cb && typeof cb === 'function') {
      cb(item, index)
    }
    if(item.children && item.children.length) {
      item.children = formatList(item.children)
    }
    return item;
  });
};
```
例子：对 `list` 数据进行处理，使每个 `item` 增加 `a`、`disabled` 属性
```js
this.list = formatData(this.list, (item) => {
  item.a = 111
  item.disabled = false
  if(item.categoryTreeNodeList) {
    item.children = item.categoryTreeNodeList
  }
})
```

## 扁平化数组

将拥有嵌套的树数组扁平化

```js
export const flatOptions = (list) => {
  let flatData = [];
  list.forEach(item => {
    if(item.children) {
      flatData = [...flatData, item, ...flatOptions(item.children)]
    } else {
      flatData.push(item)
    }
  })
  return flatData
}

```

扁平化数组并且给每个 `item` 增加上他的父级信息
```js
/**
 * @description 扁平化 list并且给每个item增加上他的父级信息
 * @param list
 * @returns {[]}  返回一个新的拉平后的数组
 */
export const flatOptions = (list, parent=null) => {
  let flatData = [];
  list.forEach(item => {
    item.parent = parent
    if(item.children) {
      flatData = [...flatData, item, ...flatOptions(item.children, item)]
    } else {
      flatData.push(item)
    }
  })
  return flatData
}
```

## 获取相应id的item数据
```js
/**
 * 求数组中相应id的数据
 * @param list
 * @param id
 * @returns {*}
 */
export const getItem = (list, id) => {
  for(let item of list) {
    if(item.id === id) {
      return item
    }
    if(item.children) {
      const row = getItem(item.children, id)
      if(row) return row
    }
  }
}
```

## 获取item的父级信息
```js
/**
 * 求数组中相应item.id的父级，通过item的id字段名获取他的父级
 * @param list 数据树
 * @param id item的id （拖拽的控件id）
 * @returns {*}
 */
export const getParent = (list, id) => {
  // 返回null则表示为根
  let parentItem = null
  if(!list) return
  if(!list.length) return
  // 如果在根部的话就直接返回null
  for(let item of list) {
    if(item.id === id) return parentItem
  }
  const loop = (children, parent=null) => {
    for(let child of children) {
      if(child.id === id) {
        parentItem = parent
        return true
      }
      if(child.children && child.children.length) {
        const f = loop(child.children, child)
        if(f) return true
      }
    }
  }
  loop(list)
  return parentItem
}
```