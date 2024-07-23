import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroDeleted, fetchHeroes, filteredHeroesSelector } from './heroesSlice';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

//Мемоизация фильтрации при помощи реселекта. Функция не будет срабатывать, если мы нажимаем повторно на один и тот же фильтр.
const HeroesList = () => {
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const heroesLoadingStatus = useSelector(state => state.heroesReducer.heroesLoadingStatus);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes());
    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback(
    id => {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(data => console.log(data, 'Deleted'))
        .then(dispatch(heroDeleted(id)))
        .catch(err => console.log(err));
    },
    // eslint-disable-next-line
    [request]
  );

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = arr => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />;
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
