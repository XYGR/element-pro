<template>
  <el-pro-dialog
    :model-value="modelValue"
    @update:model-value="(val) => $emit('update:modelValue', val)"
    @opened="$emit('opened')"
    @closed="handlerClosed"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="formRules"
      :label-width="labelWidth"
      :size="size"
    >
      <slot name="form" :model="formModel" />
      <button v-if="$attrs['onOpened']">Opened</button>
    </el-form>
    <template #footer>
      <slot v-if="$slots.footer" name="header" />
      <div v-else class="el-dialog-form-footer">
        <el-button type="danger" plain :size="size" @click="handlerCancel">
          {{ cancelText }}
        </el-button>
        <el-button
          type="primary"
          :size="size"
          :loading="submitLoading"
          @click="handlerSubmit"
        >
          {{ okText }}
        </el-button>
      </div>
    </template>
  </el-pro-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ElMessage from '@element-plus/components/message'
import { ElProDialog } from '@element-plus/components/pro-dialog'
import { ElForm } from '@element-plus/components/form'
import { ElButton } from '@element-plus/components/button'
import { proDialogFormEmits, proDialogFormProps } from './pro-dialog-form'
import type { FormInstance } from '@element-plus/components/form'

export default defineComponent({
  name: 'ElProDialogForm',
  components: {
    ElProDialog,
    ElForm,
    ElButton,
  },
  props: proDialogFormProps,
  emits: proDialogFormEmits,
  setup(props, { emit }) {
    const formRef = ref<FormInstance>()
    const submitLoading = ref<boolean>(false)

    const handlerCancel = () => {
      emit('update:modelValue', false)
    }

    const handlerSubmit = () => {
      formRef.value?.validate(async (valid) => {
        if (valid) {
          submitLoading.value = true
          if (typeof props.submit === 'function') {
            try {
              const { msg } = await props.submit(props.formModel)
              ElMessage.success(msg)
              emit('update:modelValue', false)
            } catch {
              submitLoading.value = false
            }
          }
          submitLoading.value = false
        }
      })
    }

    const handlerClosed = () => {
      emit('closed')
      formRef.value?.resetFields()
    }

    return {
      formRef,
      submitLoading,
      handlerCancel,
      handlerSubmit,
      handlerClosed,
    }
  },
})
</script>