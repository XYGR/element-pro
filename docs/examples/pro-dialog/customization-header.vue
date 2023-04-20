<template>
  <el-button text @click="defaultHeaderVisible = true">
    open a default Header ProDialog
  </el-button>
  <el-pro-dialog v-model="defaultHeaderVisible">
    default Header ProDialog
  </el-pro-dialog>

  <el-button text @click="noneHeaderVisible = true">
    open a none Header ProDialog
  </el-button>
  <el-pro-dialog v-model="noneHeaderVisible" :with-header="false">
    none Header ProDialog
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="noneHeaderVisible = false">Cancel</el-button>
        <el-button type="primary" @click="noneHeaderVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-pro-dialog>

  <el-button text @click="noneHeaderVisible = true">
    open a slot Header ProDialog
  </el-button>
  <el-pro-dialog v-model="noneHeaderVisible">
    slot Header ProDialog
    <template #header> slot Header ProDialog </template>
  </el-pro-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const defaultHeaderVisible = ref(false)
    const noneHeaderVisible = ref(false)

    return {
      defaultHeaderVisible,
      noneHeaderVisible,
    }
  },
})
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
