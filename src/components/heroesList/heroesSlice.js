import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

// const initialState = {
//   heroes: [],
//   heroesLoadingStatus: 'idle',
// };

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle',
});

//Создание асинхронного thunk-экшна
export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', () => {
  const { request } = useHttp();
  return request('http://localhost:3001/heroes');
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroCreated: (state, action) => {
      // state.heroes.push(action.payload);
      heroesAdapter.addOne(state, action.payload);
    },
    heroDeleted: (state, action) => {
      // state.heroes = state.heroes.filter(item => item.id !== action.payload);
      heroesAdapter.removeOne(state, action.payload);
    },
  },

  // Асинхронные экшны определяются в extraReducers. Здесь расписываются все кейсы (pending, fullfilled, rejected) для asyncThunk.
  extraReducers: builder => {
    builder
      .addCase(fetchHeroes.pending, state => {
        state.heroesLoadingStatus = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        // state.heroes = action.payload;
        state.heroesLoadingStatus = 'idle';
        heroesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchHeroes.rejected, state => {
        state.heroesLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;

const { selectAll } = heroesAdapter.getSelectors(state => state.heroesReducer);

//Создаём и экспортируем селектор, который будет возвращать массив героев с учётом фильтрации.
export const filteredHeroesSelector = createSelector(
  state => state.filtersReducer.activeFilter,
  // state => state.heroesReducer.heroes,
  selectAll,
  (activeFilter, heroes) => {
    if (activeFilter === 'all') {
      return heroes;
    }
    return heroes.filter(item => item.element === activeFilter);
  }
);

export const { heroCreated, heroDeleted } = actions;
