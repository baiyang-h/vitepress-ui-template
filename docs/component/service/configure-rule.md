# 配置规则模块

项目中和配置规则相关的功能，主要需要3个文件：index主体文件、invalid无效列表、dataMixin混入文件。

新增了后端返回的接口数据已做参考，一个为反显的详情数据（表单、已创建数据），一个为列表的树数据（一级为业务，子集为分类）

```
模块文件夹
├─ index.vue  （主文件）
├─ invalid.vue （无效列表）
├─ dataMixin.js （业务相关的混入文件）
```

## index.vue

规则模块主文件

<<< @/examples/service/configure-rule/index.vue

## invalid.vue

无效规则列表

<<< @/examples/service/configure-rule/invalid.vue

## dataMixin.js

属于当前规则模块业务的混入文件

<<< @/examples/service/configure-rule/dataMixin.js

## 后端返回的接口数据参考

<<< @/examples/service/configure-rule/data.js
