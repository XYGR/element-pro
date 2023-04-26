import { buildProps, definePropType, isString } from '@element-plus/utils'
import type {
  ProTableColumn,
  ProTableProps,
} from '@element-plus/components/pro-table'
import type { FormRules } from '@element-plus/components/form'
import type { ProDialogFormProps } from '@element-plus/components/pro-dialog-form'
import type { ExtractPropTypes } from 'vue'
import type ProCrud from './pro-crud.vue'

export type ProCrudWriteColumn = {
  // 表单显示的label
  title: string
  // 字段名
  dataIndex: string
  defaultValue?: any
  // 值类型 会根据不同类型渲染成不同的组件
  valueType:
    | 'string'
    | 'number'
    | 'enum'
    | 'date'
    | 'daterange'
    | 'datetime'
    | 'datetimerange'
    | 'slot'
  // select 选择器的选项
  valueEnum?: { value: any; label: any }[]
  // 是否禁用组件
  disabled?: 'create' | 'update' | 'all' | 'none'
  // placeholder
  placeholder?: string
  append?: any
}

export const proCrudProps = buildProps({
  rowKey: {
    type: String,
    required: true,
    default: 'key',
  },
  readColumns: {
    type: definePropType<ProTableColumn[]>(Array),
    required: true,
    default: () => [],
  },
  readRequest: {
    type: Function,
    required: true,
  },
  readItemRequest: {
    type: Function,
    default: undefined,
  },
  extParams: {
    type: Object,
    default: () => ({}),
  },
  writeColumns: {
    type: definePropType<ProCrudWriteColumn[]>(Array),
    default: () => [],
  },
  writeRules: {
    type: definePropType<FormRules>(Object),
    default: undefined,
  },
  writeLabelWidth: {
    type: String,
    default: '100px',
  },
  createRequest: {
    type: Function,
    default: undefined,
  },
  updateRequest: {
    type: Function,
    default: undefined,
  },
  deleteRequest: {
    type: Function,
    default: undefined,
  },
  withMenu: {
    type: definePropType<('create' | 'update' | 'delete')[]>(Array),
    default: () => ['create', 'update', 'delete'],
  },
  proTableProps: {
    type: definePropType<ProTableProps | Record<string, any>>(Object),
  },
  proDialogFormProps: {
    type: definePropType<ProDialogFormProps | Record<string, any>>(Object),
  },
})

export const proCrudEmits = {
  opened: (method: string): boolean => isString(method),
  closed: (method: string): boolean => isString(method),
}

export type ProCrudProps = ExtractPropTypes<typeof proCrudProps>
export type ProCrudEmits = ExtractPropTypes<typeof proCrudEmits>
export type ProCrudInstance = InstanceType<typeof ProCrud>
