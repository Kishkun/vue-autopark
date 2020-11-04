import {shallowMount} from '@vue/test-utils';
import CancelReserveButton from '../../../src/components/Button/CancelReserveButton';

const buttonFactory = (propsData = {}) => {
  const props = {
    selected: false,
  };
  return shallowMount(CancelReserveButton, {
    propsData: {
      ...props,
      ...propsData
    }
  })
};

describe('test CancelReserveButton', () => {
  it('test required props', () => {
    const wrapper = buttonFactory();
    expect(wrapper.find('button.is-danger').exists()).toBe(true);
    expect(wrapper.text()).toContain('Отменить бронь');
  });

  it('test event', () => {
    const wrapper = buttonFactory();
    // wrapper.vm.$emit('onCancelBooking');
    // expect(wrapper.emitted().onCancelBooking).toBeTruthy()
    wrapper.vm.handler();
    let event = wrapper.emitted('onCancelBooking');
    expect(event).toBeTruthy();
    expect(event.length).toBe(1);
  });
});
