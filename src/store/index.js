/* eslint-disable no-unused-vars */
// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import { thunk } from 'redux-thunk';
// import heroesReducer from '../reducers/heroes';
import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from '../components/heroesList/heroesSlice';
import filtersReducer from '../components/heroesFilters/filtersSlice';

// Создание собственного middlware, для преобразования логики функции dispatch, что бы она
// могла принимать в себя строки

const stringMiddleware = () => next => action => {
  if (typeof action === 'string') {
    return next({
      type: action,
    });
  }
  return next(action);
};

//Создание enhancer для улучшения функции dispatch.

// const enhancer =
//   createStore =>
//   (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = action => {
//       if (typeof action === 'string') {
//         return oldDispatch({
//           type: action,
//         });
//       }
//       return oldDispatch(action);
//     };

//     return store;
//   };

// Подключение и настройка store обычного Redux

// const store = createStore(
//   combineReducers({ heroesReducer, filtersReducer }),
//   compose(
//     applyMiddleware(thunk, stringMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

//Подключение и настройка store Redux Toolkit
//Redux Toolkit по умолчанию использует middlware для строк и функций в качестве action

const store = configureStore({
  reducer: { heroesReducer, filtersReducer },
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
