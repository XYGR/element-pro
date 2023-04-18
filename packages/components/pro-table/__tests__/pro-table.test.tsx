import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ProTable from '../src/pro-table.vue'

const AXIOM = 'Rem is the best girl'

describe('ProTable.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <ProTable>{AXIOM}</ProTable>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
