import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';

import { StoreContext } from '../../store/StoreProvider';

import { default as CourseStyle } from './Course.module.scss';
import request from '../../helpers/request';

const style = bemCssModules(CourseStyle);

const Course = ({ authors, id, img, isUserContext = false, price, title }) => {
  const { user, setUser } = useContext(StoreContext);
  const history = useHistory();

  const allAuthors = authors.join(', ');
  const isUserLogged = Boolean(user);

  const handleOnClick = async () => {
    try {
      const { data, status } = await request.patch('/users', {
        login: user.login,
        courseId: id,
      });

      if (status === 202) {
        setUser(data.user);
        history.push('/my-courses');
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const shouldBeBuyButtonVisible = isUserLogged && !isUserContext;

  return (
    <li>
      <article className={style()}>
        <h3 className={style('title')}>{title}</h3>
        <img src={img} alt={title} className={style('image')} />
        <p className={style('price')}>{`Koszt kursu: ${price}zł`}</p>
        <p className={style('authors')}>{`Autorzy kursu: ${allAuthors}`}</p>
        {shouldBeBuyButtonVisible && (
          <button onClick={handleOnClick}>Kup ten kurs</button>
        )}
      </article>
    </li>
  );
};

export default Course;
