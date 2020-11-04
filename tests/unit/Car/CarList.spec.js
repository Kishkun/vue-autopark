import { shallowMount, mount } from '@vue/test-utils'
import CarList from '@/components/Car/CarList';
import CarCard from '@/components/Car/CarCard';

describe('test CarList', () => {
  it('test empty cars', () => {
    const cars = [];
    const wrapper = shallowMount(CarList, {
      propsData: {
        cars,
      },
    });

    expect(wrapper.find('.columns').exists()).toBe(true);
    expect(wrapper.find('.is-full').exists()).toBe(true);
    expect(wrapper.find('h2').exists()).toBe(true);
    expect(wrapper.html().includes('У вас пока нет машин.')).toBe(true);
  });

  it('test custom empty message', () => {
    const wrapper = shallowMount(CarList, {
      propsData: {
        cars: [],
        emptyText: 'Нет записей...',
      },
    });

    expect(wrapper.find('h2').exists()).toBe(true);
    expect(wrapper.html().includes('Нет записей...')).toBe(true)
  });

  it('test cars count', () => {
    const cars = [
      { id: 1, title: '11', description: '11', maxSpeed: 50, currentRun: 10  },
      { id: 1, title: '11', description: '11', maxSpeed: 50, currentRun: 10  },
    ];

    const wrapper = mount(CarList, {
      propsData: {
        cars,
        emptyText: 'Нет записей...',
      },
      stubs: {
        CarCard: true,
      },
    });

    expect(wrapper.findAllComponents(CarCard).length).toBe(2)
  })
});
