import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import Course from '../Course/Course';
import { StoreContext } from '../../store/StoreProvider';

import { default as UserCoursesStyle } from './UserCourses.module.scss';

const style = bemCssModules(UserCoursesStyle);

const UserCourses = () => {
  const { user, courses } = useContext(StoreContext);

  const boughtCourses = courses
    .filter((course) => user.courses.includes(course.id))
    .map((course) => (
      <Course isUserContext={true} key={course.id} {...course} />
    ));

  return (
    <section className={style()}>
      <h2 className={style('title')}>Twoje wykupione kursy</h2>
      <ul className={style('list')}>{boughtCourses}</ul>
    </section>
  );
};

export default UserCourses;
