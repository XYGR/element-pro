import { buildProps, definePropType } from '@element-plus/utils'
import type { ExtractPropTypes } from 'vue'
import type { TableProps } from '@element-plus/components/table'
import type ProTable from './pro-table.vue'

export type ProTableColumn = {
  title: string
  dataIndex: string
  valueType:
    | 'string'
    | 'number'
    | 'enmu'
    | 'date'
    | 'daterange'
    | 'datetime'
    | 'datetimerange'
    | 'slot'
  valueEnum?: { value: any; label: any }[]
  width?: number
  minWidth?: number
  align?: 'left' | 'center' | 'right'
  search?: boolean
  hidden?: boolean
  placeholder?: string
  fixed?: string
}

export type ProTableRequestFn = (params: any) => Promise<any>
export type ProTableSelectionChangeFn = (rows: Array<any>) => void

export const proTableProps = buildProps({
  rowKey: {
    type: String,
    default: 'key',
  },
  hiddenLabel: {
    type: Boolean,
    default: false,
  },
  showIndex: {
    type: Boolean,
    default: false,
  },
  columns: {
    type: definePropType<ProTableColumn[]>(Array),
    required: true,
    default: () => [],
  },
  request: {
    type: definePropType<ProTableRequestFn>(Function),
    required: true,
  },
  selectionChange: {
    type: definePropType<ProTableSelectionChangeFn>(Function),
    default: null,
  },
  maxHeight: {
    type: String,
    default: null,
  },
  withTools: {
    type: definePropType<'resize'[]>(Array),
    default: () => ['resize'],
  },
  defaultSize: {
    type: definePropType<'small' | 'default' | 'large'>(String),
    default: 'default',
  },
  tableProps: {
    type: definePropType<TableProps<any>>(Object),
    required: false,
  },
})
export const proTableEmits = {
  reset: (): void => undefined,
  'row-click': (row: any, column: any, event: any): boolean =>
    event instanceof MouseEvent,
}

export type ProTableProps = ExtractPropTypes<typeof proTableProps>
export type ProTableEmits = typeof proTableEmits
export type ProTableInstance = InstanceType<typeof ProTable>
