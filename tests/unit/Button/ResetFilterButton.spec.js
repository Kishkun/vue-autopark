import {mount} from '@vue/test-utils';
import ResetFilterButton from '../../../src/components/Button/ResetFilterButton';

describe('test ResetFilterButton', () => {
  it('test required props', () => {
    const wrapper = mount(ResetFilterButton);
    const button = wrapper.find('.button.is-primary');

    expect(wrapper.find('.buttons').exists()).toBe(true);
    expect(button.text()).toContain('Сбросить фильтр');
  });

  it('test event', () => {
    const wrapper = mount(ResetFilterButton);
    wrapper.vm.$emit('onResetFilter');
    expect(wrapper.emitted().onResetFilter).toBeTruthy()
  });
});
