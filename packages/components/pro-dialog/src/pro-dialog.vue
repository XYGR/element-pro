<template>
  <el-dialog
    class="el-pro-dialog"
    :class="{
      'el-pro-dialog--without-header': !withHeader,
    }"
    :width="width"
    :show-close="false"
    :close-on-click-modal="false"
    v-bind="{ ...dialogProps }"
    :model-value="modelValue"
    @opened="$emit('opened')"
    @closed="$emit('closed')"
    @before-close="beforeClose"
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

type DoneFn = (cancel?: boolean) => void

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

    const beforeClose = (done: DoneFn) => {
      if (typeof props.beforeClose === 'function') {
        props.beforeClose(done)
      } else {
        done()
      }
    }

    return {
      handlerClosed,
      beforeClose,
    }
  },
})
</script>
