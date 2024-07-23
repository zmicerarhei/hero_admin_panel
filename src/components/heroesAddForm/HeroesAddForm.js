/* eslint-disable no-unused-vars */
// import { heroCreated } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Form, useField, useFormik } from 'formik';
import * as Yup from 'yup';

import { heroCreated } from '../heroesList/heroesSlice';
import { selectAll } from '../heroesFilters/filtersSlice';
import { useHttp } from '../../hooks/http.hook';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const { filtersLoadingStatus } = useSelector(state => state.filtersReducer);
  const filters = useSelector(selectAll);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmitHandler = async values => {
    const newHero = {
      id: uuidv4(),
      ...values,
    };
    request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
      .then(res => console.log(res, 'Отправка успешна'))
      .then(dispatch(heroCreated(newHero)))
      .catch(err => console.log(err));
  };

  const renderFilters = (filters, status) => {
    if (status === 'loading') {
      return <option>Загрузка элементов</option>;
    } else if (status === 'error') {
      return <option>Ошибка загрузки</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        // eslint-disable-next-line
        if (name === 'all') return;

        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        element: 'fire',
      }}
      validationSchema={Yup.object({
        name: Yup.string().min(5, 'Must be 5 characters or more').required('Required'),
        description: Yup.string().min(10, 'Must be 10 characters or more').required('Required'),
      })}
      onSubmit={values => onSubmitHandler(values)}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit} className="border p-4 shadow-lg rounded">
          <div className="mb-3">
            <label htmlFor="name" className="form-label fs-4">
              Имя нового героя
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Как меня зовут?"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label fs-4">
              Описание
            </label>
            <textarea
              className="form-control"
              id="description"
              placeholder="Что я умею?"
              style={{ height: '130px' }}
              {...formik.getFieldProps('description')}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-danger">{formik.errors.description}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="element" className="form-label">
              Выбрать элемент героя
            </label>
            <select id="element" className="form-select" {...formik.getFieldProps('element')}>
              {/* <option disabled>Я владею элементом</option> */}
              {renderFilters(filters, filtersLoadingStatus)}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Создать
          </button>
        </form>
      )}
    </Formik>
  );
};

export default HeroesAddForm;
