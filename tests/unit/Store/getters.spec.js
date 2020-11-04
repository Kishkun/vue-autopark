import carsStore from '../../../src/store/cars/cars'
import {makeActionList, getDate} from '../../../src/helpers/utils'

const getters = carsStore.getters;

const data = [
  {id: 1, min: 0, max: 10},
  {id: 2, min: 11, max: 20},
  {id: 3, min: 21},
];

const result = [
  {id: 1, name: '0-10'},
  {id: 2, name: '11-20'},
  {id: 3, name: '>21'},
];

const cars = [
  {id: 1, title: 'BMW X1', maxSpeed: 5, currentRun: 5, isBooked: false,},
  {id: 2, title: 'BMW X2', maxSpeed: 12, currentRun: 13, isBooked: false,},
  {id: 3, title: 'BMW X3', maxSpeed: 45, currentRun: 46, isBooked: false,},
];

describe('CARS GETTERS', () => {
  it('test makeActionList', () => {
    const actual = makeActionList(data);
    expect(actual).toEqual(result)
  });

  it('test speedRange', () => {
    const state = {maxSpeedItems: data};
    const actual = getters.speedRange(state);
    expect(actual).toEqual(result)
  });

  it('test runRange', () => {
    const state = {runItems: data};
    const actual = getters.runRange(state);
    expect(actual).toEqual(result)
  });

  it('test carItems', () => {
    const state = {cars, runItems: data, maxSpeedItems: data, bookedCars: []};
    let actual = getters.carItems(state);
    expect(actual).toEqual(cars);

    state.speedValue = 1;
    actual = getters.carItems(state);
    expect(actual).toEqual([{id: 1, title: 'BMW X1', maxSpeed: 5, currentRun: 5, isBooked: false,}]);

    state.speedValue = 0;
    state.runValue = 2;
    actual = getters.carItems(state);
    expect(actual).toEqual([{id: 2, title: 'BMW X2', maxSpeed: 12, currentRun: 13, isBooked: false,}]);

    state.speedValue = 3;
    state.runValue = 3;
    actual = getters.carItems(state);
    expect(actual).toEqual([{id: 3, title: 'BMW X3', maxSpeed: 45, currentRun: 46, isBooked: false,}])
  });

  it('test bookedDays', () => {
    const state = {
      bookedCars: [
        {id: 1, date: '2016-01-01'},
        {id: 2, date: '2016-01-05'}
      ]
    };
    const actual = getters.bookedDays(state);
    expect(actual).toEqual(['2016-01-01', '2016-01-05'])
  });

  it('test bookedCars', () => {
    const state = {
      cars,
      bookedCars: [
        {id: 1, date: '2020-01-10'},
        {id: 2, date: '2020-01-01'},
      ]
    };
    const actual = getters.bookedCars(state);
    expect(actual).toEqual([
      {id: 2, carName: 'BMW X2', bookedDate: '2020-01-01'},
      {id: 1, carName: 'BMW X1', bookedDate: '2020-01-10'},
    ])
  });

  it('test firstAllowedDay', () => {
    const state = {
      currentDate: '2020-03-31',
      bookedCars: []
    };
    let actual = getters.firstAllowedDay(state);
    expect(actual).toEqual(getDate('2020-03-31'));

    state.bookedCars.push({id: 1, date: '2020-03-31'});
    state.bookedCars.push({id: 2, date: '2020-04-01'});
    actual = getters.firstAllowedDay(state);
    expect(actual).toEqual(getDate('2020-04-02'))
  });

  it('test todayCar', () => {
    const car1 = {id: 1, date: '2020-03-31'};
    const car2 = {id: 2, date: '2020-04-05'};

    const state = {
      currentDate: '2020-03-31',
      bookedCars: [],
      cars
    };
    let actual = getters.todayCar(state);
    expect(actual).toEqual({});

    state.bookedCars.push(car1, car2);

    actual = getters.todayCar(state);
    expect(actual).toEqual(cars[0])
  })
});
