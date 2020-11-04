import carsStore from '../../../src/store/cars/cars'

const mutations = carsStore.mutations;

describe('CARS MUTATIONS', () => {
  it('set loading', () => {
    const state = { isLoading: false };
    mutations.SET_LOADING(state, true);
    expect(state).toEqual({ isLoading: true });

    mutations.SET_LOADING(state, false);
    expect(state).toEqual({ isLoading: false })
  });

  it('set cars', () => {
    const state = { cars: [] };
    const cars = [{ id: 1, name: 'BMV' }];
    mutations.SET_CARS(state, cars);
    expect(state).toEqual({ cars })
  });

  it('set speed items', () => {
    const state = { maxSpeedItems: [] };
    const maxSpeedItems = [{ id: 1, name: '100' }];
    mutations.SET_SPEED_ITEMS(state, maxSpeedItems);
    expect(state).toEqual({ maxSpeedItems })
  });

  it('set run items', () => {
    const state = { runItems: [] };
    const runItems = [{ id: 1, name: '100' }];
    mutations.SET_RUN_ITEMS(state, runItems);
    expect(state).toEqual({ runItems })
  });

  it('add car booking', () => {
    const state = { bookedCars: [] };
    const car = {id: 1, date: '2020-01-01'};
    mutations.SET_CAR_BOOKING(state, car);
    expect(state).toEqual({ bookedCars: [car] })
  });

  it('cancel car booking', () => {
    const car1 = {id: 1, date: '2020-01-01'};
    const car2 = {id: 1, date: '2020-01-01'};
    const state = { bookedCars: [car1, car2] };
    mutations.SET_CANCEL_CAR_BOOKING(state, car1);
    expect(state).toEqual({ bookedCars: [car2] })
  });

  it('change current day', () => {
    const state = { currentDate: '' };
    mutations.SET_CURRENT_DAY(state, '2020-01-01');
    expect(state).toEqual({ currentDate: '2020-01-01' })
  });

  it('set filter value', () => {
    const state = { speedValue: null, runValue: null };
    mutations.SET_FILTER_VALUE(state, { name: 'speedValue', value: 3 });
    expect(state).toEqual({ speedValue: 3, runValue: null })
  });

  it('reset filters', () => {
    const state = { speedValue: 2, runValue: 4 };
    mutations.SET_RESET(state);
    expect(state).toEqual({ speedValue: null, runValue: null })
  })
});
