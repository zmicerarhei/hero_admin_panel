import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { activeFilterChanged, fetchFilters, selectAll } from './filtersSlice';

import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const { filtersLoadingStatus, activeFilter } = useSelector(state => state.filtersReducer);
  const filters = useSelector(selectAll);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const filterBtns = filters.map(({ name, label, className }) => {
    const btnClass = classNames('btn', className, {
      active: name === activeFilter,
    });

    return (
      <button key={name} onClick={() => dispatch(activeFilterChanged(name))} className={btnClass}>
        {label}
      </button>
    );
  });

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{filterBtns}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
