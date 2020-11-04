import moment from 'moment'
import Vuex from 'vuex'
import Buefy from 'buefy'
import PortalVue from 'portal-vue'

import carsStore from '../../../src/store/cars/cars'

import { shallowMount, createLocalVue } from '@vue/test-utils'
import AppHeader from '../../../src/components/AppHeader/AppHeader'

import App from '../../../src/App'
import data from '../../../src/data/store'
const { cars: carsItems, speedItems, runItems } = data;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);
localVue.use(PortalVue);

const store = new Vuex.Store({
  modules: {
    cars: {
      ...carsStore,
      ...{
        cars: carsItems,
        speedItems,
        runItems,
      }
    }
  }
});

describe('test App', () => {
  it('app works', () => {
    const wrapper = shallowMount(App, {
      localVue,
      store,
    });
    const header = wrapper.findComponent(AppHeader);
    expect(header.attributes().date).toBe(moment().format('YYYY-MM-DD'));
    expect(header.attributes().carName).toEqual(undefined);
  })
});
