<template>
  <el-dialog
    class="el-pro-dialog"
    v-bind="{ ...dialogProps }"
    :show-close="false"
    :model-value="modelValue"
    @opened="$emit('opened')"
    @closed="$emit('closed')"
  >
    <template v-if="withHeader" #header>
      <slot v-if="$slots.header" name="header" />
      <h5 v-else class="el-pro-dialog-title">
        {{ title }}
      </h5>
      <button
        v-if="showClose"
        class="el-drawer__close-btn"
        @click="handlerClosed"
      >
        <el-icon>
          <Close />
        </el-icon>
      </button>
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { ElDialog } from '@element-plus/components/dialog'
import { ElIcon } from '@element-plus/components/icon'
import { proDialogEmits, proDialogProps } from './pro-dialog'

export default defineComponent({
  name: 'ElProDialog',
  components: {
    Close,
    ElIcon,
    ElDialog,
  },
  props: proDialogProps,
  emits: proDialogEmits,
  setup(props, { emit }) {
    const handlerClosed = () => {
      emit('update:modelValue', false)
    }

    return {
      handlerClosed,
    }
  },
})
</script>