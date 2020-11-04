import Vue from 'vue'
import PortalVue from 'portal-vue'

import { mount } from '@vue/test-utils'
import CarCard from '@/components/Car/CarCard'

Vue.use(PortalVue);

const cardFactory = (propsData = {}) => {
  const props = {
    carId: 100,
    title: 'Mazda 6',
    description: 'Юбилейная серия, эксклюзивные условия покупки - воспользуйтесь уникальным предложением!',
    maxSpeed: 250,
    currentRun: 22,
  };
  return mount(CarCard, {
    propsData: {
      ...props,
      ...propsData
    },
  })
};

it('test required carCard props', () => {
  const wrapper = cardFactory();
  expect(wrapper.find('.content > p').text().includes('Юбилейная серия, эксклюзивные условия покупки - воспользуйтесь уникальным предложением!')).toBe(true);
  expect(wrapper.find('.media-content > p').text().includes('Mazda 6')).toBe(true);
  expect(wrapper.find('li:first-of-type').html()).toContain('<strong>Max скорость: </strong>250 км/ч');
  expect(wrapper.find('li:nth-of-type(2)').html()).toContain('<strong>Пробег: </strong>22 тыс. км.');
  expect(wrapper.find('div.card').classes('active')).toBe(false)
});

// 1 property
it('test isBooked property', async () => {
  const wrapper = cardFactory({isBooked: true});

  expect(wrapper.find('div.card').classes('active')).toBe(true);

  const link = wrapper.find('a.car-booking-toggle-button');
  expect(link.exists()).toBe(true);
  expect(link.classes('has-text-danger')).toBe(true);
  expect(link.text()).toContain('Отказаться');

  await wrapper.setProps({isBooked: false});
  expect(link.classes('has-text-success')).toBe(true);
  expect(link.text()).toContain('Забронировать')
});

// 1 events
// it('test emit events', () => {
//   const wrapper = cardFactory();
//   wrapper.vm.toggleBooking();
//
//   let event = wrapper.emitted('toggle-booking');
//   expect(event).toBeTruthy();
//   expect(event.length).toBe(1);
//   expect(event[0]).toEqual([true]);
//
//   wrapper.setProps({isBooked: true});
//   wrapper.vm.toggleBooking();
//   event = wrapper.emitted('toggle-booking');
//   expect(event.length).toBe(2);
//   expect(event[1]).toEqual([false])
// });

// 2 events
// it('test booking without mount', () => {
//   const events = {};
//   const $emit = (event, ...args) => { events[event] = [...args] };
//
//   CarCard.methods.toggleBooking.call({ $emit });
//   expect(events['toggle-booking']).toEqual([true]);
//
//   CarCard.methods.toggleBooking.call({ isBooked: true, $emit });
//   expect(events['toggle-booking']).toEqual([false])
// });
