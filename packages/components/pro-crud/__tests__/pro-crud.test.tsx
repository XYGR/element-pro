import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ProCrud from '../src/pro-crud.vue'

const AXIOM = 'Rem is the best girl'

describe('ProCrud.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <ProCrud>{AXIOM}</ProCrud>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
