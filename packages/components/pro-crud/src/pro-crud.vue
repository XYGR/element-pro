<template>
  <div class="el-pro-crud">
    <el-pro-table
      ref="proTableRef"
      v-bind="{ ...proTableProps }"
      :columns="readColumns.concat(extColumn)"
      :request="beforeRead"
      :row-key="rowKey"
    >
      <template v-for="key in readSlots" :key="key" #[key]="target">
        <slot :name="'read-' + key" :attr="{ ...target }" />
      </template>
      <template #toolbar-right="{ size }">
        <slot name="toolbar-right" :attr="{ size }" />
        <el-button
          v-if="withMenu.includes('create')"
          type="primary"
          :size="size"
          @click="beforeCreate"
        >
          新增
        </el-button>
      </template>
      <template #column-optional="{ row, column, $index }">
        <slot name="write-column-optional" :attr="{ row, column, $index }" />
        <el-button
          v-if="withMenu.includes('update')"
          type="primary"
          link
          @click="beforeUpdate(row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="withMenu.includes('delete')"
          type="danger"
          link
          @click="beforeDelete(row)"
        >
          删除
        </el-button>
      </template>
    </el-pro-table>
    <el-pro-dialog-form
      v-model="formVisible"
      :form-model="formModel"
      :form-rules="writeRules"
      :label-width="writeLabelWidth"
      :submit="beforeRequest"
      :title="formMethod === 'create' ? '新增' : '编辑'"
      v-bind="{ ...proDialogFormProps }"
      @closed="handlerClosed"
    >
      <template #form="{ model }">
        <el-form-item
          v-for="item in writeColumns"
          :key="item.dataIndex"
          :prop="item.dataIndex"
          :label="item.title"
        >
          <el-input
            v-if="item.valueType === 'string'"
            v-model="model[item.dataIndex]"
            :placeholder="item.placeholder ?? '请输入'"
            :disabled="
              item.disabled?.includes(formMethod) || item.disabled === 'all'
            "
          >
            <template v-if="item.append" #append>
              <component :is="item.append" />
            </template>
          </el-input>
          <el-input-number
            v-else-if="item.valueType === 'number'"
            v-model="model[item.dataIndex]"
            :placeholder="item.placeholder ?? '请输入'"
            :disabled="
              item.disabled?.includes(formMethod) || item.disabled === 'all'
            "
          />
          <el-select
            v-else-if="item.valueType === 'enmu'"
            v-model="model[item.dataIndex]"
            :clearable="true"
            :filterable="true"
            :placeholder="item.placeholder ?? '请选择'"
            :disabled="
              item.disabled?.includes(formMethod) || item.disabled === 'all'
            "
          >
            <el-option
              v-for="option in item.valueEnum"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              :disabled="
                item.disabled?.includes(formMethod) || item.disabled === 'all'
              "
            />
          </el-select>
          <el-date-picker
            v-else-if="item.valueType === 'date'"
            v-model="model[item.dataIndex]"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            clearable
            :placeholder="item.placeholder ?? '请选择'"
            :disabled="
              item.disabled?.includes(formMethod) || item.disabled === 'all'
            "
          />
          <slot
            v-else-if="item.valueType === 'slot'"
            :name="'write-form-' + item.dataIndex"
            :attr="{ model, item, method: formMethod }"
          />
        </el-form-item>
      </template>
    </el-pro-dialog-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { ElFormItem } from '@element-plus/components/form'
import { ElButton } from '@element-plus/components/button'
import { ElInput } from '@element-plus/components/input'
import { ElInputNumber } from '@element-plus/components/input-number'
import { ElOption, ElSelect } from '@element-plus/components/select'
import { ElDatePicker } from '@element-plus/components/date-picker'
import { ElProTable } from '@element-plus/components/pro-table'
import { ElProDialogForm } from '@element-plus/components/pro-dialog-form'
import { ElMessageBox } from '@element-plus/components/message-box'
import { ElMessage } from '@element-plus/components/message'
import { proCrudEmits, proCrudProps } from './pro-crud'
import type { ProTableColumn } from '@element-plus/components/pro-table'

export default defineComponent({
  name: 'ElProCrud',
  components: {
    ElFormItem,
    ElButton,
    ElInput,
    ElInputNumber,
    ElOption,
    ElSelect,
    ElDatePicker,
    ElProTable,
    ElProDialogForm,
  },
  props: proCrudProps,
  emits: proCrudEmits,
  setup(props, { slots, emit, expose }) {
    const proTableRef = ref()
    const slotKeys = ref(Object.keys(slots))
    const readSlots = computed(() => {
      let keys: string[] = []
      keys = slotKeys.value.filter((key) => key.startsWith('read-'))
      keys = keys.map((key) => key.replace('read-', ''))
      return keys
    })
    const writeSlots = computed(() =>
      slotKeys.value.filter((key) => key.startsWith('write-'))
    )
    const formVisible = ref<boolean>(false)
    const formMethod = ref<'create' | 'update' | 'delete'>('create')
    const formModel = reactive({})
    const extColumn = computed<ProTableColumn[]>(() => {
      const column: ProTableColumn[] = []
      if (
        props.withMenu.includes('update') ||
        props.withMenu.includes('delete') ||
        slotKeys.value.includes('write-column-optional')
      ) {
        column.push({
          title: '操作',
          dataIndex: 'optional',
          valueType: 'slot',
        })
      }
      return column
    })
    const handlerClosed = () => {
      proTableRef.value.load()
      emit('closed', formMethod.value)
    }

    const beforeRead = (params: any) => {
      if (typeof props.readRequest === 'function') {
        return props.readRequest({ ...params, ...props.extParams })
      }
    }

    const beforeRequest = () => {
      if (
        formMethod.value === 'create' &&
        typeof props.createRequest === 'function'
      ) {
        return props.createRequest({ ...formModel, ...props.extParams })
      }
      if (
        formMethod.value === 'update' &&
        typeof props.updateRequest === 'function'
      ) {
        return props.updateRequest({ ...formModel, ...props.extParams })
      }
    }

    const beforeCreate = () => {
      formMethod.value = 'create'
      formVisible.value = true
      emit('opened', 'create')
    }

    const beforeUpdate = async (row: any) => {
      if (typeof props.readItemRequest === 'function') {
        formMethod.value = 'update'
        formVisible.value = true
        const { data } = await props.readItemRequest({
          [props.rowKey]: row[props.rowKey],
        })
        Object.keys(data).forEach((key) => {
          // @ts-ignore
          formModel[key] = data[key]
        })
      } else {
        formMethod.value = 'update'
        formVisible.value = true
        emit('opened', 'update')
        Object.keys(row).forEach((key) => {
          // @ts-ignore
          formModel[key] = row[key]
        })
      }
    }

    const beforeDelete = async (row: any) => {
      if (typeof props.deleteRequest === 'function') {
        formMethod.value = 'delete'
        ElMessageBox.confirm('确定要删除这条数据吗?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: async (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              try {
                props.deleteRequest &&
                  (await props.deleteRequest({
                    [props.rowKey]: row[props.rowKey],
                  }))
                done()
                instance.confirmButtonLoading = false
                ElMessage.success('删除成功!')
                handlerClosed()
              } catch {
                done()
              }
            } else {
              done()
            }
          },
        }).catch(() => {
          // ignore Uncaught (in promise) cancel
        })
      }
    }

    const load = () => {
      proTableRef.value.load()
    }

    expose({ load })

    return {
      proTableRef,
      slotKeys,
      readSlots,
      writeSlots,
      formVisible,
      formModel,
      formMethod,
      extColumn,
      beforeCreate,
      handlerClosed,
      beforeRead,
      beforeRequest,
      beforeUpdate,
      beforeDelete,
    }
  },
})
</script>
