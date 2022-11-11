import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
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
    if (!email || !password) {
      return;
    }
    onLogin(password, email)
  };

  return (
    <div className='entry'>
      <form className='entry__form' onSubmit={handleSubmit}>
      <h2 className='entry__title'>Вход</h2>
        <input className='entry__input' name='email' type='email' value={email}
               placeholder='Email' onChange={handleChange} required/>
        <input className='entry__input' name='password' type='password' value={password}
               placeholder='Пароль' onChange={handleChange} required/>
        <button className='entry__btn-submit' type='submit'>Войти</button>
      </form>
    </div>
  )
};

export default Login;