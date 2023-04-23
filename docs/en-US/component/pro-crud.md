---
title: ProCrud 快速增删改查
lang: en-US
---

# ProCrud 快速增删改查

基于 `ProTable` 和 `ProDialogForm` 的二次封装, 集成了查询表单、分页、表格数据、增删改查等功能。

## 基础用法

ProCrud 一个基础的增删改查展示场景。

:::demo 需要设置 `read-columns` 属性，它接收 `Array`，用于描述表格的字段，以及 `read-request` 属性，它接收 `Function`，用于向后端获取 `data`。 ProCrud 分为三个部分：`Form`、`Table`、`ProDialogForm` 和 `Pagination`。

pro-crud/basic-usage

:::

## Attributes

| 属性名                | 说明                                                                      | 类型                | 可选值 | 默认值                         |
| --------------------- | ------------------------------------------------------------------------- | ------------------- | ------ | ------------------------------ |
| row-key               | 主键 `key`, 如果需要用到 删除、编辑、修改 功能则必传                      | `string`            | —      | key                            |
| read-columns          | 同 `ProTable` 的 `columns`                                                | `Array`             | —      | []                             |
| read-request          | 同 `ProTable` 的 `request`                                                | `function`          | —      | false                          |
| read-item-request     | 点击编辑时调用的钩子，用于查询 item 信息，如果没有传入则直接同 `row` 获取 | `function`          | —      | []                             |
| ext-params            | 会合并到每个 `request` 的 参数中 用于从外部传入一些额外的信息             | `object`            | —      | —                              |
| write-columns         | 新增和编辑的字段描述                                                      | `Array`             | —      | —                              |
| write-rules           | 同 `Form` 的 `rules`                                                      | `Array`             | —      | —                              |
| write-label-width     | 同 `Form` 的 `label-width`                                                | `string` / `number` | —      | `100px`                        |
| create-request        | 新增表单的提交函数，用于向服务端发起请求                                  | `function`          | —      | —                              |
| update-request        | 编辑表单的提交函数，用于向服务端发起请求                                  | `function`          | —      | —                              |
| delete-request        | 删除表单的提交函数，用于向服务端发起请求                                  | `function`          | —      | —                              |
| with-tools            | 控制按钮的显示隐藏                                                        | `string`            | —      | `['create','update','delete']` |
| pro-table-props       | ProTableProps 的 props 类型和 proTableProps 一致                          | Object              | —      | —                              |
| pro-dialog-form-props | ProDialogFormProps 的 props 类型和 proDialogFormProps 一致                | Object              | —      | —                              |

## Slots

| 插槽名       | 说明                                    |
| ------------ | --------------------------------------- |
| read-[name]  | [name]对应 `ProTable`中的 `slot`。      |
| write-[name] | [name]对应 `ProDialogForm`中的 `slot`。 |

## Events

| 事件名 | 说明                 | 参数 |
| ------ | -------------------- | ---- |
| opened | 新增或编辑窗口被打开 | —    |
| closed | 新增或编辑窗口被关闭 | —    |
