<template>
  <el-pro-table :columns="columns" :request="remoteData" :hidden-label="true">
    <template #column-operation="{ row, $index }">
      <el-button size="small" @click="handleEdit($index, row)">Edit</el-button>
      <el-button size="small" type="danger" @click="handleDelete($index, row)"
        >Delete</el-button
      >
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
        title: 'Status',
        dataIndex: 'status',
        valueType: 'enum',
        valueEnum: [
          {
            value: 1,
            label: 'Enable',
          },
          {
            value: 0,
            label: 'Disable',
          },
        ],
      },
      {
        title: 'Address',
        dataIndex: 'address',
        valueType: 'string',
      },
      {
        title: 'Operations',
        dataIndex: 'operation',
        width: 200,
        valueType: 'slot',
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
            status: 1,
            address: 'New York No. 1 Lake Park',
          },
          {
            name: 'Jim Green',
            age: 42,
            sex: 'Girl',
            status: 0,
            address: 'London No. 1 Lake Park',
          },
          {
            name: 'Joe Black',
            age: 32,
            sex: 'Man',
            status: 1,
            address: 'Sidney No. 1 Lake Park',
          },
          {
            name: 'Jim Red',
            age: 32,
            sex: 'Girl',
            status: 0,
            address: 'London No. 2 Lake Park',
          },
          {
            name: 'Jake White',
            age: 18,
            sex: 'Man',
            status: 1,
            address: 'Dublin No. 2 Lake Park',
          },
        ],
        total: 5,
        current: 1,
        pageSize: 10,
      }
    }

    const handleEdit = (index: number, row: any) => {
      console.log(index, row)
    }
    const handleDelete = (index: number, row: any) => {
      console.log(index, row)
    }

    return {
      columns,
      remoteData,
      handleEdit,
      handleDelete,
    }
  },
})
</script>

<style scoped></style>
