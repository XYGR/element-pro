---
title: TimePicker 时间选择器
lang: zh-CN
---

# TimePicker 时间选择器

用于选择或输入日期

:::tip

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).

:::

## 任意时间点

可以选择任意时间

:::demo 提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开`arrow-control`属性则通过界面上的箭头进行选择。

time-picker/basic

:::

## 限制时间选择范围

您也可以限制时间选择范围。

:::demo 通过 `disabledHours`，`disabledMinutes` 和 `disabledSeconds` 限制可选时间范围。,

time-picker/basic-range

:::

## 任意时间范围

可选择任意的时间范围

:::demo 添加`is-range`属性即可选择时间范围。 同样支持 `arrow-control` 属性。

time-picker/range

:::

## API

### Attributes

| 属性名                   | 说明                                                      | 类型                                                                                                 | Default     |
| --------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------- |
| model-value / v-model | 绑定值，如果它是数组，长度应该是 2                                      | ^[number] / ^[string] / ^[object]`Date \| [Date, Date] \| [number, number] \| [string, string]` | —           |
| readonly              | 完全只读                                                    | ^[boolean]                                                                                         | false       |
| disabled              | 禁用                                                      | ^[boolean]                                                                                         | false       |
| editable              | 文本框可输入                                                  | ^[boolean]                                                                                         | true        |
| clearable             | 是否显示清除按钮                                                | ^[boolean]                                                                                         | true        |
| size                  | 输入框尺寸                                                   | ^[enum]`'large' \| 'default' \| 'small'`                                                         | —           |
| placeholder           | 非范围选择时的占位内容                                             | ^[string]                                                                                          | —           |
| start-placeholder     | 范围选择时开始日期的占位内容                                          | ^[string]                                                                                          | —           |
| end-placeholder       | 范围选择时结束日期的占位内容                                          | ^[string]                                                                                          | —           |
| is-range              | 是否为时间范围选择                                               | ^[boolean]                                                                                         | false       |
| arrow-control         | 是否使用箭头进行时间选择                                            | ^[boolean]                                                                                         | false       |
| popper-class          | TimePicker 下拉框的类名                                       | ^[string]                                                                                          | —           |
| range-separator       | 选择范围时的分隔符                                               | ^[string]                                                                                          | '-'         |
| format                | 显示在输入框中的格式                                              | ^[string] see [date formats](/en-US/component/date-picker#date-formats)                            | —           |
| default-value         | 可选，选择器打开时默认显示的时间                                        | ^[Date] / ^[array]`[Date, Date]`                                                                   | —           |
| id                    | 等价于原生 input `id` 属性                                     | ^[string] / ^[array]`[string, string]`                                                             | —           |
| name                  | 等价于原生 input `name` 属性                                   | ^[string]                                                                                          | —           |
| label ^(a11y)         | same as `aria-label` in native input                    | ^[string]                                                                                          | —           |
| prefix-icon           | Custom prefix icon component                            | ^[string] / ^[Component]                                                                           | Clock       |
| clear-icon            | Custom clear icon component                             | ^[string] / ^[Component]                                                                           | CircleClose |
| disabled-hours        | To specify the array of hours that cannot be selected   | ^[Function]`(role: string, comparingDate?: Dayjs) => number[]`                                  | —           |
| disabled-minutes      | To specify the array of minutes that cannot be selected | ^[Function]`(hour: number, role: string, comparingDate?: Dayjs) => number[]`                    | —           |
| disabled-seconds      | To specify the array of seconds that cannot be selected | ^[Function]`(hour: number, minute: number, role: string, comparingDate?: Dayjs) => number[]`    | —           |
| teleported            | whether time-picker dropdown is teleported to the body  | ^[boolean]                                                                                         | true        |
| tabindex              | input tabindex                                          | ^[string] / ^[number]                                                                              | 0           |

### Events

| 事件名            | 说明                         | Type                                                                                                                 |
| -------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| change         | 用户确认选定的值时触发                | ^[Function]`(val: number \| string \| Date \| [number, number] \| [string, string] \| [Date, Date]) => void` |
| blur           | 在组件 Input 失去焦点时触发          | ^[Function]`(e: FocusEvent) => void`                                                                              |
| focus          | 在组件 Input 获得焦点时触发          | ^[Function]`(e: FocusEvent) => void`                                                                              |
| visible-change | 当 TimePicker 的下拉列表出现/消失时触发 | ^[Function]`(visibility: boolean) => void`                                                                        |

### Exposes

| Name        | 说明           | Type                                                  |
| ----------- | ------------ | ----------------------------------------------------- |
| focus       | 使 input 获取焦点 | ^[Function]`(e: FocusEvent \| undefined) => void` |
| blur        | 使 input 失去焦点 | ^[Function]`(e: FocusEvent \| undefined) => void` |
| handleOpen  | 打开时间选择器弹窗    | ^[Function]`() => void`                            |
| handleClose | 关闭时间选择器弹窗    | ^[Function]`() => void`                            |
