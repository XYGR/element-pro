import { withInstall } from '@element-plus/utils'
import ProDialog from './src/pro-dialog.vue'

export const ElProDialog = withInstall(ProDialog)
export default ElProDialog

export * from './src/pro-dialog'
export type { ProDialogInstance } from './src/instance'
