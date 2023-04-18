import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ProDialogForm from '../src/pro-dialog-form.vue'

const AXIOM = 'Rem is the best girl'

describe('ProDialog-form.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <ProDialogForm>{AXIOM}</ProDialogForm>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
