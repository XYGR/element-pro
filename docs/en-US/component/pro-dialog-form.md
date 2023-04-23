---
title: ProDialogForm 弹出框表单
lang: en-US
---

# ProDialogForm 弹出框表单

基于 ProDialog 的二次封装, 用于弹出表单，自带表单验证和提交按钮

## 基础用法

Dialog 弹出一个表单对话框，适合简单的表单提交场景。

:::demo 需要设置 `model-value / v-model` 属性，它接收 `Boolean`，当为 `true` 时显示 ProDialog。 ProDialog 分为三个部分：`header`、`form` 和 `footer`，`header` 需要传入对应名称的具名 `slot`。 `title` 属性用于定义标题，它是可选的，默认值为 ProDialogForm。

pro-dialog-form/basic-usage

:::

## 表单验证

可以通过 `form-rules` 属性来定义表单验证规则，具体规则参考 [Element Plus Form](https://element-plus.org/#/zh-CN/component/form#biao-dan-yan-zheng)

:::demo

pro-dialog-form/form-rules

:::

## Attributes

| 属性名                | 说明                                               | 类型                                     | 可选值 | 默认值        |
| --------------------- | -------------------------------------------------- | ---------------------------------------- | ------ | ------------- |
| model-value / v-model | 是否显示 ProDialogForm                             | `boolean`                                | —      | —             |
| title                 | ProDialogForm 弹出框 的标题                        | `string`                                 | —      | ProDialogForm |
| width                 | ProDialogForm 的宽度                               | `string` / `number`                      | —      | 30%           |
| form-model            | 表单数据对象同 `Form` 的 `model`                   | `Record<string, any>`                    | —      | —             |
| form-rules            | 表单验证规则同 `Form` 的 `rules`                   | `boolean`                                | —      | true          |
| label-width           | 标签的长度，同 `Form` 的 `label-width`             | ^[string] / ^[number]                    | —      | —             |
| size                  | 用于控制该表单内组件的尺寸                         | ^[enum]`'large' \| 'default' \| 'small'` | —      | `default`     |
| ok-text               | 确认按钮的文本                                     | `string`                                 | —      | 确认          |
| cancel-text           | 取消按钮的文本                                     | `string`                                 | —      | 取消          |
| submit                | 表单校验通过之后调用的函数可以用来向服务器发起请求 | `Function`                               | —      | 取消          |
| pro-dialog-props      | ProDialog 的 props 类型和 proDialogProps 一致      | Object                                   | —      | —             |
| form-props            | Form 的 props 类型和 formProps 一致                | Object                                   | —      | —             |

## Slots

| 插槽名 | 说明                                                   |
| ------ | ------------------------------------------------------ |
| form   | 表单内容                                               |
| header | 对话框标题的内容；会替换标题部分，但不会移除关闭按钮。 |
| footer | ProDialogForm 按钮操作区的内容                         |

## Events

| 事件名 | 说明                               | 参数 |
| ------ | ---------------------------------- | ---- |
| opened | ProDialogForm 打开动画结束时的回调 | —    |
| closed | ProDialogForm 关闭动画结束时的回调 | —    |
