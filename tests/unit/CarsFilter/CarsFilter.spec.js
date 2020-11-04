import Vue from 'vue';
import Buefy from 'buefy';
import { mount } from '@vue/test-utils';
import CarsFilter from '@/components/CarsFilter/CarsFilter';
import BaseSelect from '@/components/select/BaseSelect';

Vue.use(Buefy);

describe('test CarsFilter', () => {
  it('test html',  () => {
    const wrapper = mount(CarsFilter, {
      stubs: {
        BaseSelect: true
      }
    });

    expect(wrapper.find('h2').text()).toContain('Фильтр');
    expect(wrapper.findAll('label').length).toBe(2);
    expect(wrapper.findAllComponents(BaseSelect).length).toBe(2);
    expect(wrapper.findAll('label').at(0).text()).toBe('Max скорость, км/ч');
    expect(wrapper.findAll('label').at(1).text()).toBe('Пробег, тыс. км.');
  });

  it('test methods', () => {
    const events = {};
    const $emit = (event, ...args) => { events[event] = [...args] };
    const localThis = { speedValue: 0, runValue: 0, $emit};

    CarsFilter.methods.onChangeMaxSpeed.call(localThis, 2);
    expect(events['change-speed']).toEqual([2]);

    CarsFilter.methods.onChangeCurrentRun.call(localThis, 2);
    expect(events['change-run']).toEqual([2]);

    CarsFilter.methods.onResetFilter.call(localThis);
    expect(events['reset-filter']).toEqual([]);
  })
});
