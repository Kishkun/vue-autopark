import moment from 'moment'

import { mount } from '@vue/test-utils'

import CarBookingModalWindow from '../../../src/components/CarBookingModalWindow/CarBookingModalWindow'
import DatePicker from '../../../src/components/DatePicker/DatePicker'

const modalFactory = (propsData = {}) => {
  const props = {
    carId: 100,
    title: 'Mazda 6',
    bookedDays: [],
    firstAllowedDay: new Date(),
  };
  return mount(CarBookingModalWindow, {
    propsData: {
      ...props,
      ...propsData
    },
    stubs: {
      ['b-field']: true,
      ['b-modal']: true,
      DatePicker: true,
    }
  })
};

describe('test CarBookingModalWindow', () => {
  it('test template and required props', () => {
    const wrapper = modalFactory();
    expect(wrapper.find('.modal-card').exists()).toBe(true);
    expect(wrapper.find('.modal-card-head').exists()).toBe(true);
    expect(wrapper.find('.modal-card-body').exists()).toBe(true);
    expect(wrapper.find('.modal-card-foot').exists()).toBe(true);
    expect(wrapper.find('.booking-buttons').exists()).toBe(true);
    expect(wrapper.find('.modal-card-head').text()).toContain('Mazda 6')
  });

  it('test emit events', () => {
    const wrapper = modalFactory();
    wrapper.vm.onConfirm();

    let event = wrapper.emitted('confirm');
    expect(event).toBeTruthy();
    expect(event.length).toBe(1);
    expect(event[0]).toEqual([moment().format('YYYY-MM-DD')]);

    wrapper.vm.onClose();
    event = wrapper.emitted('close');
    expect(event.length).toBe(1);
  })
});
