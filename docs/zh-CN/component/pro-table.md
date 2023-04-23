---
title: ProTable 高阶表格
lang: zh-CN
---

# ProTable 高阶表格

基于 `Form` 和 `Table` 的二次封装, 集成了查询表单、分页、表格数据等功能。

## 基础用法

ProTable 一个基础的查询、分页表单，适合简单的展示场景。

:::demo 需要设置 `columns` 属性，它接收 `Array`，用于描述表格的字段，以及 `request` 属性，它接收 `Function`，用于向后端获取 `data`。 ProTable 分为三个部分：`Form`、`Table` 和 `Pagination`。

pro-table/basic-usage

:::

## 自定义 column

可以通过具名 `slot` `column-[data-index]` 来自定义列的内容。
:::demo

pro-table/customization-column

:::

## 枚举类型 enum

可以通过配置 `valueType` 为 `enum` ，并配置 `valueEnum` 来列举类型。
:::demo

pro-table/customization-enum

:::

## 自定义列模板

自定义列的显示内容，可组合其他组件使用。
:::demo 通过 slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。

pro-table/customization-operation

:::

## Attributes

| 属性名           | 说明                                             | 类型                                     | 可选值 | 默认值       |
| ---------------- | ------------------------------------------------ | ---------------------------------------- | ------ | ------------ |
| row-key          | 同 `Table`                                       | `string`                                 | —      | key          |
| hidden-label     | 是否隐藏查询表单的 label                         | `boolean`                                | —      | false        |
| show-index       | 等同于 `type=index`                              | `boolean`                                | —      | false        |
| columns          | 用于描述表格的字段                               | `Array`                                  | —      | []           |
| request          | 查询的钩子方法                                   | `function`                               | —      | —            |
| selection-change | `Table` 列表选择函数传入了此方法会自动开启勾选列 | `function`                               | —      | —            |
| max-height       | 同 `Table`                                       | `string` / `number`                      | —      | —            |
| with-tools       | 开启哪些工具                                     | ^[enum]` 'resize'``Array `               | —      | `['resize']` |
| default-size     | `ProTable` 默认 `size`                           | ^[enum]`'large' \| 'default' \| 'small'` | —      | `default`    |
| form-props       | Form 的 props 类型和 formProps 一致              | Object                                   | —      | —            |
| table-props      | Table 的 props 类型和 tableProps 一致            | Object                                   | —      | —            |

## Slots

| 插槽名              | 说明                                    |
| ------------------- | --------------------------------------- |
| column-[data-index] | 自定义 column data-index 取自 columns。 |
| custom              | table 内容                              |

## Events

| 事件名    | 说明                         | 参数               |
| --------- | ---------------------------- | ------------------ |
| reset     | 重置 ProTable                | —                  |
| row-click | 当某一行被点击时会触发该事件 | row, column, event |
