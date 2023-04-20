<template>
  <el-button text @click="dialogTableVisible = true">
    open a Table nested ProDialog
  </el-button>

  <el-pro-dialog v-model="dialogTableVisible" title="Shipping address">
    <el-table :data="gridData">
      <el-table-column property="date" label="Date" width="150" />
      <el-table-column property="name" label="Name" width="200" />
      <el-table-column property="address" label="Address" />
    </el-table>
  </el-pro-dialog>

  <!-- Form -->
  <el-button text @click="dialogFormVisible = true">
    open a Form nested ProDialog
  </el-button>

  <el-pro-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-pro-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const dialogTableVisible = ref(false)
    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'

    const form = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    })

    const gridData = [
      {
        date: '2016-05-02',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
      },
      {
        date: '2016-05-04',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
      },
      {
        date: '2016-05-01',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
      },
      {
        date: '2016-05-03',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
      },
    ]

    return {
      dialogTableVisible,
      dialogFormVisible,
      formLabelWidth,
      form,
      gridData,
    }
  },
})
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
