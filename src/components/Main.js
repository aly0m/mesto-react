import api from '../utils/api';
import Card from './Card';
import {useState, useEffect} from 'react';


const Main = (props) => {
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInititalCards()
      .then(res => {
        setCards(res)
      })
      .catch(err => console.log(`Error: ${err}`))
    
    api.getUserInfo()
      .then(res => {
        setUserName(res.name)
        setUserDescription(res.about)
        setUserAvatar(res.avatar)
      })
      .catch(err => console.log(`Error: ${err}`))
  }, []);

  return (
    <main>
      <section className='profile'>
        <div className='profile__overlay'>
          <img className='profile__image' src={userAvatar} alt='Avatar' onClick={props.onEditAvatar}/>
        </div>
        <div className='profile__container'>
          <div className='profile__group'>
            <h1 className='profile__name'>{userName}</h1>
            <button className='profile__btn profile__btn_type_edit' type='button' onClick={props.onEditProfile}/>
          </div>
          <p className='profile__description'>{userDescription}</p>
        </div>
        <button className='profile__btn profile__btn_type_add' type='button' onClick={props.onAddPlace}/>
      </section>
      <section className='cards'>
        <ul className='cards__list'>
          {cards.map((item) => (
            <Card key={item._id} cardData={item} onClick={props.onCardClick}/>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;