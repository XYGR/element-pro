import { buildProps, definePropType, isBoolean } from '@element-plus/utils'
import type { ExtractPropTypes } from 'vue'
import type { FormProps, FormRules } from '@element-plus/components/form'
import type ProDialogForm from './pro-dialog-form.vue'
import type { ProDialogProps } from '@element-plus/components/pro-dialog'

export type ProDialogFormSubmitFn = () => Promise<{
  success?: boolean
  msg?: string
}>

export const proDialogFormProps = buildProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: 'ProDialogForm',
  },
  width: {
    type: String,
    default: '30%',
  },
  formModel: {
    type: definePropType<Record<string, any>>(Object),
    default: undefined,
  },
  formRules: {
    type: definePropType<FormRules>(Object),
    default: undefined,
  },
  labelWidth: {
    type: String,
    default: '90px',
  },
  size: {
    type: definePropType<'large' | 'default' | 'small'>(String),
    default: () => 'default',
  },
  okText: {
    type: String,
    default: '确认',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  submit: {
    type: definePropType<ProDialogFormSubmitFn>(Function),
    default: undefined,
  },
  proDialogProps: {
    type: definePropType<ProDialogProps | Record<string, any>>(Object),
    required: false,
  },
  formProps: {
    type: definePropType<FormProps | Record<string, any>>(Object),
    required: false,
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
