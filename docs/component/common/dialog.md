# Dialog 弹框

常用的通用性弹框

## 基础弹框

基础的弹框展示用法。

:::demo
<<< @/examples/dialog/base-dialog.vue
:::

## 非受控组件弹框

通过`ref`的方式调用组件内部的方法，可通过方法直接传递参数到组件内部，在组件内部直接编写业务，和外部隔离不受影响，这可以是一个独立的空间

:::demo `dialogRef.value.open(params)`的方式来显示弹框，并传入参数 
<<< @/examples/dialog/test2.vue
:::
非受控弹框组件

<<< @/examples/dialog/base-dialog2.vue
