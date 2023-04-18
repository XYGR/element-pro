import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { rAF } from '@element-plus/test-utils/tick'
import ProDialog from '../src/pro-dialog.vue'

const AXIOM = 'Rem is the best girl'

describe('ProDialog.vue', () => {
  test('render test', async () => {
    const wrapper = mount(() => <ProDialog modelValue>{AXIOM}</ProDialog>)

    await nextTick()
    await rAF()
    await nextTick()
    expect(wrapper.find('.el-dialog__body').text()).toEqual(AXIOM)
  })
})
