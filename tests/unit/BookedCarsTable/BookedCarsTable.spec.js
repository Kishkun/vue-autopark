import { mount } from '@vue/test-utils';
import BookedCarsTable from '../../../src/components/BookedCarsTable/BookedCarsTable';

const tableFactory = (propsData = {}) => {
  const props = {
    emptyText: 'У вас пока нет забронированных машин...',
    title: 'Список забронированных машин',
    columns: [],
    selected: null,
  };
  return mount(BookedCarsTable, {
    propsData: {
      ...props,
      ...propsData
    },
    stubs: {
      ['b-table']: true,
      ['b-icon']: true,
    }
  })
};

describe('test BookedCarsTable', () => {
  it('test template and required props', () => {
    const wrapper = tableFactory();
    expect(wrapper.find('.booked-cars-table').exists()).toBe(true);
    expect(wrapper.find('.subtitle').text()).toContain('Список забронированных машин')
  });

  it('test emit events', () => {
    const wrapper = tableFactory();
    wrapper.vm.$emit('onCancelBooking');
    expect(wrapper.emitted().onCancelBooking).toBeTruthy()
  })
});
