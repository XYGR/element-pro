<template>
  <el-button text @click="visible = true">
    click to open the ProDialogForm
  </el-button>
  <el-pro-dialog-form
    v-model="visible"
    :form-model="formModel"
    :submit="submit"
  >
    <template #form="{ model }">
      <el-form-item label="name">
        <el-input v-model="model.name" placeholder="Please input name" />
      </el-form-item>
      <el-form-item label="mobile">
        <el-input v-model="model.mobile" placeholder="Please input mobile" />
      </el-form-item>
      <el-form-item label="sex">
        <el-select v-model="model.sex" placeholder="Please select sex">
          <el-option value="girl" label="Girl">Girl</el-option>
          <el-option value="man" label="Man">Man</el-option>
        </el-select>
      </el-form-item>
    </template>
  </el-pro-dialog-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)
    const formModel = reactive({
      name: '',
      mobile: '',
      sex: 'girl',
    })
    const submit = () => {
      return new Promise<{ msg: string }>((resolve) => {
        setTimeout(() => {
          resolve({ msg: 'success!' })
        }, 1000)
      })
    }

    return {
      visible,
      formModel,
      submit,
    }
  },
})
</script>

<style scoped></style>
