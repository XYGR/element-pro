---
title: ProDialog 弹出框
lang: en-US
---

# ProDialog 弹出框

基于 Dialog 的二次封装

## 基础用法

ProDialog 弹出一个对话框，适合需要定制性更大的场景。

:::demo 需要设置 `model-value / v-model` 属性，它接收 `Boolean`，当为 `true` 时显示 ProDialog。 ProDialog 分为三个部分：`header`、`body` 和 `footer`，`header` 需要具名为 `header` 的 `slot`，`footer` 需要具名为 `footer` 的 `slot`。 `title` 属性用于定义标题，它是可选的，默认值为 ProDialog。

pro-dialog/basic-usage

:::

## 自定义内容

对话框的内容可以是任何东西，甚至是一个表格或表单。 此示例显示如何在 ProDialog 中使用 Element Plus 的表格和表单。

:::demo

pro-dialog/customization-content

:::

## 自定义头部

`header` 可用于自定义显示标题的区域。 为了保持可用性，除了使用此插槽外，使用 `title` 属性

:::demo 可通过 `with-header` 传入 `false` 来获得一个无 `header` 的 ProDialog

pro-dialog/customization-header

:::

## Attributes

| 属性名                | 说明                                                                                               | 类型                                  | 可选值 | 默认值 |
| --------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------- | ------ | ------ |
| model-value / v-model | 是否显示 ProDialog                                                                                 | boolean                               | —      | —      |
| title                 | ProDialog 弹出框 的标题， 也可通过具名 slot （见下表）传入                                         | string                                | —      | —      |
| width                 | ProDialog 的宽度                                                                                   | string / number                       | —      | 30%    |
| withHeader            | 是否显示 Header                                                                                    | boolean                               | —      | true   |
| show-close            | 是否显示关闭按钮                                                                                   | boolean                               | —      | true   |
| before-close          | 关闭前的回调，会暂停 ProDialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候. | Function(done) (done 用来关闭 Dialog) | —      | —      |
| dialogProps           | Dialog 的 props 类型和 Dialog 一致                                                                 | boolean                               | —      | false  |

## Slots

| 插槽名 | 说明                                                   |
| ------ | ------------------------------------------------------ |
| —      | ProDialog 的内容                                       |
| header | 对话框标题的内容；会替换标题部分，但不会移除关闭按钮。 |
| footer | ProDialog 按钮操作区的内容                             |

## Events

| 事件名 | 说明                           | 参数 |
| ------ | ------------------------------ | ---- |
| opened | ProDialog 打开动画结束时的回调 | —    |
| closed | ProDialog 关闭动画结束时的回调 | —    |
