import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [userData, setUserData] = useState({
    password: '',
    email: ''
  });

  const {password, email} = userData;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(password, email);
  };

  return (
    <div className='entry'>
      <form className='entry__form' onSubmit={handleSubmit}>
      <h2 className='entry__title'>Регистрация</h2>
        <input className='entry__input' id='email' name='email' type='email' value={email}
               placeholder='Email' onChange={handleChange} required/>
        <input className='entry__input' id='password' name='password' type='password' value={password}
               placeholder='Пароль' onChange={handleChange} required/>
        <button className='entry__btn-submit' type='submit'>Зарегистрироваться</button>
        <p className='entry__anchor'>Уже зарегистрированы?
          <Link className='entry__link' to='/sign-in'> Войти</Link>
        </p>
      </form>
    </div>
  )
};

export default Register;