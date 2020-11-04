import { mount } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader/AppHeader'

describe('test AppHeader', () => {
  it('test title', () => {
    const wrapper = mount(AppHeader, {
      propsData: {
        title: 'Мой автопарк',
      },
    });

    expect(wrapper.html().includes('Мой автопарк')).toBe(true)
  });

  it('test class', () => {
    const wrapper = mount(AppHeader, {
      propsData: {
        title: 'Мой автопарк',
      },
    });
    expect(wrapper.classes('auto-header')).toBe(true)
  })
});


