import carsStore from '../../../src/store/cars/cars'
import data from '../../../src/data/store'

jest.mock('@/helpers/messages', () => ({
  showInfo: jest.fn()
}));

const getters = carsStore.getters;
const actions = carsStore.actions;

describe('CARS ACTIONS', () => {
  it('test GET_LOADING', () => {
    const commit = jest.fn();
    actions.GET_LOADING({commit}, true);
    expect(commit).toHaveBeenCalledWith('SET_LOADING', true);

    actions.GET_LOADING({commit}, false);
    expect(commit).toHaveBeenCalledWith('SET_LOADING', false)
  });

  it('test GET_STATE_INFO', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const {cars, speedItems, runItems} = data;

    await actions.GET_STATE_INFO({commit, dispatch});

    expect(dispatch).toHaveBeenCalledWith('GET_LOADING', true);
    expect(commit).toHaveBeenCalledWith('SET_CARS', cars);
    expect(commit).toHaveBeenCalledWith('SET_SPEED_ITEMS', speedItems);
    expect(commit).toHaveBeenCalledWith('SET_RUN_ITEMS', runItems);
    expect(dispatch).toHaveBeenCalledWith('GET_LOADING', false)
  });

  it('test CHANGE_CURRENT_DAY', () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    const day = '2020-01-01';

    actions.CHANGE_CURRENT_DAY({commit, dispatch}, day);

    expect(dispatch).toHaveBeenCalledWith('GET_LOADING', true);
    expect(commit).toHaveBeenCalledWith('SET_CURRENT_DAY', day);
    expect(dispatch).toHaveBeenCalledWith('GET_LOADING', false);
  });

  it('test ADD_CAR_BOOKING', () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    const payload = {id: 1, date: '2020-01-01'};

    actions.ADD_CAR_BOOKING({commit, dispatch}, payload);
    expect(dispatch).toHaveBeenCalledWith('GET_LOADING', true);
    expect(commit).toHaveBeenCalledWith('SET_CAR_BOOKING', payload);
    expect(dispatch).toHaveBeenCalledWith('GET_LOADING', false);
  });

  it('test CANCEL_CAR_BOOKING',  () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    const payload = {id: 1, date: '2020-01-01'};

    actions.CANCEL_CAR_BOOKING({commit, dispatch, getters }, payload);
    expect(dispatch).toHaveBeenCalledWith('GET_LOADING', true);
    expect(commit).toHaveBeenCalledWith('SET_CANCEL_CAR_BOOKING', payload);
    if (getters.bookedCars.length === 0) {}
    expect(dispatch).toHaveBeenCalledWith('GET_LOADING', false);
  });

  it('test CHANGE_FILTER_VALUE',() => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    const filter = {name: 'speedValue', value: 1};

    actions.CHANGE_FILTER_VALUE({commit, dispatch}, filter);

    expect(dispatch).toHaveBeenCalledWith('GET_LOADING', true);
    expect(commit).toHaveBeenCalledWith('SET_FILTER_VALUE', filter);
    expect(dispatch).toHaveBeenCalledWith('GET_LOADING', false);
  });

  it('test RESET_FILTER', () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    actions.RESET_FILTER({ commit, dispatch});

    expect(dispatch).toHaveBeenCalledWith('GET_LOADING', true);
    expect(commit).toHaveBeenCalledWith('SET_RESET');
    expect(dispatch).toHaveBeenCalledWith('GET_LOADING', false);
  })
});
