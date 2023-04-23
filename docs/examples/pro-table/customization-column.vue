<template>
  <el-pro-table :columns="columns" :request="remoteData" :hidden-label="true">
    <template #column-sex="{ row }">
      <el-tag>{{ row.sex }}</el-tag>
    </template>
  </el-pro-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { ProTableColumn } from 'element-plus'

export default defineComponent({
  setup() {
    const columns: ProTableColumn[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        valueType: 'string',
        search: true,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        valueType: 'number',
      },
      {
        title: 'Sex',
        dataIndex: 'sex',
        valueType: 'slot',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        valueType: 'string',
      },
    ]
    const remoteData = () => {
      return {
        success: true,
        data: [
          {
            name: 'John Brown',
            age: 32,
            sex: 'Man',
            address: 'New York No. 1 Lake Park',
          },
          {
            name: 'Jim Green',
            age: 42,
            sex: 'Girl',
            address: 'London No. 1 Lake Park',
          },
          {
            name: 'Joe Black',
            age: 32,
            sex: 'Man',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            name: 'Jim Red',
            age: 32,
            sex: 'Girl',
            address: 'London No. 2 Lake Park',
          },
          {
            name: 'Jake White',
            age: 18,
            sex: 'Man',
            address: 'Dublin No. 2 Lake Park',
          },
        ],
        total: 5,
        current: 1,
        pageSize: 10,
      }
    }

    return {
      columns,
      remoteData,
    }
  },
})
</script>

<style scoped></style>
