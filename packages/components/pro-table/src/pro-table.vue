<template>
  <div class="el-pro-table">
    <el-form
      ref="formRef"
      :inline="true"
      :model="model"
      :size="resizeVal"
      class="el-pro-table-form"
    >
      <el-row :gutter="12" style="row-gap: 12px">
        <template v-for="(item, index) in formColumns">
          <el-col
            v-if="formLayout.maxCol > index || formLayout.isOpen"
            :key="item.dataIndex"
            :span="formLayout.span"
          >
            <el-form-item
              :prop="item.dataIndex"
              :label="hiddenLabel ? '' : item.title"
              label-width="80px"
            >
              <el-input
                v-if="item.valueType === 'string'"
                v-model="model[item.dataIndex]"
                :placeholder="item.placeholder ?? '请输入'"
              />
              <el-input-number
                v-else-if="item.valueType === 'number'"
                v-model="model[item.dataIndex]"
                :placeholder="item.placeholder ?? '请输入'"
              />
              <el-select
                v-else-if="item.valueType === 'enmu'"
                v-model="model[item.dataIndex]"
                :clearable="true"
                :filterable="true"
                :placeholder="item.placeholder ?? '请选择'"
              >
                <el-option
                  v-for="option in item.valueEnum"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
              <slot
                v-else-if="item.valueType === 'slot'"
                :name="'form-' + item.dataIndex"
                :model="model"
                :item="item"
              />
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="formLayout.span" :offset="formLayout.offSet">
          <div
            style="
              width: 100%;
              display: flex;
              justify-content: flex-end;
              column-gap: 12px;
            "
          >
            <el-button
              type="primary"
              :loading="searchLoading"
              :resize-val="resizeVal"
              @click="load"
            >
              查询
            </el-button>
            <el-button
              style="margin-left: 0"
              :resize-val="resizeVal"
              @click="reload"
            >
              重置
            </el-button>
            <el-button
              v-if="formColumns.length > formLayout.maxCol"
              type="primary"
              link
              style="padding: 0; border: none; margin-left: 0"
              :resize-val="resizeVal"
              @click="formLayout.isOpen = !formLayout.isOpen"
            >
              {{ formLayout.isOpen ? '收起' : '展开' }}
              <el-icon>
                <component
                  :is="formLayout.isOpen ? 'arrow-up' : 'arrow-down'"
                />
              </el-icon>
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="el-pro-table-body">
      <div class="el-pro-table-toolbar">
        <div class="table-toolbar-left">
          <slot name="toolbar-left" :size="resizeVal" />
        </div>
        <div class="table-toolbar-right">
          <slot name="toolbar-right" :size="resizeVal" />
          <el-dropdown
            v-if="withTools.includes('resize')"
            trigger="click"
            popper-class="toolbar-right-dropdown"
            :size="resizeVal"
            @command="handleSizeCommand"
          >
            <div class="toolbar-right-trigger">
              <el-icon :class="'size-' + resizeVal">
                <Operation />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  command="small"
                  :class="{ 'is-active': resizeVal === 'small' }"
                >
                  小尺寸
                </el-dropdown-item>
                <el-dropdown-item
                  command="default"
                  :class="{ 'is-active': resizeVal === 'default' }"
                >
                  中尺寸
                </el-dropdown-item>
                <el-dropdown-item
                  command="large"
                  :class="{ 'is-active': resizeVal === 'large' }"
                >
                  大尺寸
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <el-table
        v-if="!$slots.customTable"
        ref="tableRef"
        :data="tableData"
        :row-key="rowKey"
        :border="true"
        :size="resizeVal"
        empty-text="暂无数据"
        :max-height="maxHeight"
        width="100vw"
        v-bind="{ ...tableProps }"
        @row-click="(row: any, column: any, event: any) => $emit('row-click',row, column, event)"
        @selection-change="selectionChange"
      >
        <el-table-column
          v-if="typeof selectionChange === 'function'"
          type="selection"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="showIndex"
          type="index"
          :width="62"
          label="序号"
          align="center"
          show-overflow-tooltip
          fixed="left"
        />
        <template v-for="item in tableColumns" :key="item.dataIndex">
          <el-table-column
            v-if="$slots['column-' + item.dataIndex]"
            :label="item.title"
            :width="item.width"
            :min-width="item.minWidth"
            :prop="item.dataIndex"
            :align="item.align"
            show-overflow-tooltip
            :fixed="item.fixed ?? false"
          >
            <template #default="{ row, column, $index }">
              <slot
                :name="'column-' + item.dataIndex"
                :row="row"
                :column="column"
                :row-index="$index"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.valueType == 'enmu'"
            :label="item.title"
            :width="item.width"
            :min-width="item.minWidth"
            :prop="item.dataIndex"
            :align="item.align"
            show-overflow-tooltip
            :fixed="item.fixed ?? false"
          >
            <template #default="{ row }">
              {{
                item.valueEnum?.find(
                  ({ value }: any) => value === row[item.dataIndex]
                )
                  ? item.valueEnum?.find(
                      ({ value }: any) => value === row[item.dataIndex]
                    )?.label
                  : row[item.dataIndex]
              }}
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :label="item.title"
            :prop="item.dataIndex"
            :width="item.width"
            :min-width="item.minWidth"
            :align="item.align"
            show-overflow-tooltip
            :fixed="item.fixed ?? false"
          />
        </template>
        <slot name="custom" />
      </el-table>
      <slot name="customTable" />
      <el-pagination
        v-model:page-size="pagination.pageSize"
        v-model:current-page="pagination.current"
        background
        :small="resizeVal !== 'large'"
        layout="total, prev, pager, next, size"
        :total="pagination.total"
        style="padding: 16px 0"
        @size-change="load"
        @current-change="load"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { ElForm, ElFormItem } from '@element-plus/components/form'
import { ElInput } from '@element-plus/components/input'
import { ElInputNumber } from '@element-plus/components/input-number'
import { ElOption, ElSelect } from '@element-plus/components/select'
import { ElIcon } from '@element-plus/components/icon'
import {
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
} from '@element-plus/components/dropdown'
import { ElRow } from '@element-plus/components/row'
import { ElCol } from '@element-plus/components/col'
import { ElTable, ElTableColumn } from '@element-plus/components/table'
import { ElPagination } from '@element-plus/components/pagination'
import { ElButton } from '@element-plus/components/button'
import { ArrowDown, ArrowUp, Operation } from '@element-plus/icons-vue'
import { proTableEmits, proTableProps } from './pro-table'
import type { Ref } from 'vue'

export default defineComponent({
  name: 'ElProTable',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElInputNumber,
    ElSelect,
    ElOption,
    ElIcon,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElRow,
    ElCol,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElButton,
    ArrowDown,
    ArrowUp,
    Operation,
  },
  props: proTableProps,
  emits: proTableEmits,
  setup(props, { emit }) {
    const model = reactive<Record<string, any>>({})
    const formLayout = reactive<{
      isOpen: boolean
      maxCol: number
      offSet: number
      span: number
    }>({ isOpen: false, maxCol: 3, offSet: 0, span: 6 })
    const formRef = ref()
    const searchLoading: Ref<boolean> = ref<boolean>(false)
    const tableData: Ref<any[]> = ref<any[]>([])
    const tableRef = ref()
    const pagination = reactive<{
      pageSize: number
      current: number
      total: number
    }>({ pageSize: 10, current: 1, total: 0 })

    // toolbar 变量
    const resizeVal = ref<'small' | 'default' | 'large'>(props.defaultSize)

    const handleSizeCommand = (command: 'small' | 'default' | 'large') => {
      resizeVal.value = command
    }

    const params = computed(() => {
      const obj: Record<string, any> = {}
      Object.keys(model).forEach((key) => {
        if (model[key] !== '') {
          obj[key] = model[key]
        }
      })
      obj.pageSize = pagination.pageSize
      obj.current = pagination.current
      return obj
    })

    const diffOffSet = () => {
      let { isOpen, maxCol, offSet, span } = formLayout
      const length = formColumns.value.length
      if (isOpen) {
        offSet = (maxCol - (length % (maxCol + 1))) * span
      } else {
        offSet = length >= maxCol ? 0 : (maxCol - length) * span
      }
      formLayout.offSet = offSet
    }

    const formColumns = computed(() =>
      props.columns.filter((item) => item.search)
    )
    const tableColumns = computed(() =>
      props.columns.filter((item) => !item.hidden)
    )

    watch(() => formColumns, diffOffSet)
    watch(() => formLayout.isOpen, diffOffSet)
    watch(() => formLayout.span, diffOffSet)
    diffOffSet()

    const load = async () => {
      if (props.request && typeof props.request === 'function') {
        searchLoading.value = true
        try {
          const { data, pageSize, total, current } = await props.request(
            params.value
          )
          tableData.value = data
          pagination.pageSize = pageSize
          pagination.total = total
          pagination.current = current
        } catch {
        } finally {
          searchLoading.value = false
        }
      }
    }

    load()

    const reload = () => {
      formRef.value.resetFields()
      pagination.pageSize = 10
      pagination.current = 1
      emit('reset')
      load()
    }

    return {
      model,
      formColumns,
      formLayout,
      formRef,
      searchLoading,
      tableColumns,
      tableData,
      tableRef,
      pagination,
      resizeVal,
      load,
      reload,
      handleSizeCommand,
    }
  },
})
</script>
