import { heroesFetching, heroesFetched, heroesFetchingError } from '../components/heroesList/heroesSlice';
import { filtersFetching, filtersFetched, filtersFetchingError } from '../components/heroesFilters/filtersSlice';

// Создание комбинированных экшнов

export const fetchHeroes = request => dispatch => {
  dispatch(heroesFetching());
  request('http://localhost:3001/heroes')
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = request => dispatch => {
  dispatch(filtersFetching());
  request('http://localhost:3001/filters')
    .then(res => dispatch(filtersFetched(res)))
    .catch(() => dispatch(filtersFetchingError()));
};

// export const deleteHero = (request, id) => dispatch => {
//   request(`http://localhost:3001/heroes/${id}`, 'DELETE')
//     .then(() => console.log('Hero has been deleted'))
//     .then(dispatch(heroDeleted(id)))
//     .catch(err => console.log(err));
// };

// Создание экшнов в Redux Toolkit

// export const heroesFetching = createAction('HEROES_FETCHING');
// export const heroesFetched = createAction('HEROES_FETCHED');
// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');
// export const heroCreated = createAction('HERO_CREATED');
// export const heroDeleted = createAction('HERO_DELETED');

// Создание экшнов в обычном Redux

// export const heroesFetching = () => {
//   return {
//     type: 'HEROES_FETCHING',
//   };
// };

// export const heroesFetched = heroes => {
//   return {
//     type: 'HEROES_FETCHED',
//     payload: heroes,
//   };
// };

// export const heroesFetchingError = () => {
//   return {
//     type: 'HEROES_FETCHING_ERROR',
//   };
// };

// export const heroDeleted = id => {
//   return {
//     type: 'HERO_DELETED',
//     payload: id,
//   };
// };

// export const heroCreated = hero => {
//   return {
//     type: 'HERO_CREATED',
//     payload: hero,
//   };
// };

// export const filtersFetching = () => {
//   return {
//     type: 'FILTERS_FETCHING',
//   };
// };

// export const filtersFetched = filters => {
//   return {
//     type: 'FILTERS_FETCHED',
//     payload: filters,
//   };
// };

// export const filtersFetchingError = () => {
//   return {
//     type: 'FILTERS_FETCHING_ERROR',
//   };
// };

// export const activeFilterChanged = filter => {
//   return {
//     type: 'ACTIVE_FILTER_CHANGED',
//     payload: filter,
//   };
// };
