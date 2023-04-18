import { buildProps, definePropType, isBoolean } from '@element-plus/utils'
import type { ExtractPropTypes } from 'vue'
import type { FormRules } from '@element-plus/components/form'
import type ProDialogForm from './pro-dialog-form.vue'

export type ProDialogFormSubmitFn = (params: any) => Promise<{
  success: boolean
  msg: string
}>

export const proDialogFormProps = buildProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
  formModel: {
    type: definePropType<Record<string, any>>(Object),
    default: undefined,
  },
  formRules: {
    type: definePropType<FormRules>(Object),
    default: undefined,
  },
  okText: {
    type: String,
    default: '确认',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  labelWidth: {
    type: String,
    default: '90px',
  },
  size: {
    type: definePropType<'large' | 'default' | 'small'>(String),
    default: () => 'default',
  },
  submit: {
    type: definePropType<ProDialogFormSubmitFn>(Function),
    default: undefined,
  },
})

export const proDialogFormEmits = {
  opened: () => true,
  closed: () => true,
  ['update:modelValue']: (value: boolean) => isBoolean(value),
}
export type ProDialogFormEmits = typeof proDialogFormEmits

export type ProDialogFormProps = ExtractPropTypes<typeof proDialogFormProps>
export type ProDialogFormInstance = InstanceType<typeof ProDialogForm>
