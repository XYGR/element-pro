<template>
  <el-pro-crud
    row-key="uid"
    :read-columns="columns"
    :read-request="remoteData"
    :write-columns="writeColumn"
    :create-request="createData"
    :update-request="updateData"
    :delete-request="deleteData"
    :pro-table-props="{ hiddenLabel: true }"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { ProCrudWriteColumn, ProTableColumn } from 'element-plus'

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
        title: 'Address',
        width: 200,
        dataIndex: 'address',
        valueType: 'string',
      },
    ]
    const writeColumn: ProCrudWriteColumn[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        valueType: 'string',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        valueType: 'number',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        valueType: 'string',
      },
    ]

    const basicData = ref([
      {
        uid: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        uid: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        uid: 3,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        uid: 4,
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
      },
      {
        uid: 5,
        name: 'Jake White',
        age: 18,
        address: 'Dublin No. 2 Lake Park',
      },
    ])

    const remoteData = () => {
      return {
        success: true,
        data: basicData.value,
        total: 5,
        current: 1,
        pageSize: 10,
      }
    }

    const createData = (data: any) => {
      basicData.value.push({
        uid: basicData.value.length + 1,
        ...data,
      })
      return {
        success: true,
        data: basicData.value,
        msg: '添加成功',
      }
    }

    const updateData = (data: any) => {
      basicData.value = basicData.value.map((item) => {
        if (item.uid === data.uid) {
          return data
        }
        return item
      })
      return {
        success: true,
        data: basicData.value,
        msg: '更新成功',
      }
    }

    const deleteData = (data: any) => {
      basicData.value = basicData.value.filter((item) => item.uid !== data.uid)
      return {
        success: true,
        data: basicData.value,
        msg: '删除成功',
      }
    }

    return {
      columns,
      writeColumn,
      remoteData,
      createData,
      updateData,
      deleteData,
    }
  },
})
</script>
