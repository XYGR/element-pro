import { buildProps, definePropType, isBoolean } from '@element-plus/utils'
import type { DialogProps } from '@element-plus/components/dialog'

import type { ExtractPropTypes } from 'vue'

export const proDialogProps = buildProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '30%',
  },
  title: {
    type: String,
    default: 'ProDialog',
  },
  withHeader: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  dialogProps: {
    type: definePropType<DialogProps | Record<string, any>>(Object),
    required: false,
  },
})

export type ProDialogProps = ExtractPropTypes<typeof proDialogProps>

export const proDialogEmits = {
  opened: () => true,
  closed: () => true,
  ['update:modelValue']: (value: boolean) => isBoolean(value),
}
export type ProDialogEmits = typeof proDialogEmits
