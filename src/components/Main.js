import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Main = (props) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className='profile'>
        <div className='profile__overlay' onClick={props.onEditAvatar}>
          <img className='profile__image' src={currentUser.avatar} alt='Avatar'/>
        </div>
        <div className='profile__container'>
          <div className='profile__group'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button className='profile__btn profile__btn_type_edit' type='button' onClick={props.onEditProfile}/>
          </div>
          <p className='profile__description'>{currentUser.about}</p>
        </div>
        <button className='profile__btn profile__btn_type_add' type='button' onClick={props.onAddPlace}/>
      </section>
      <section className='cards'>
        <ul className='cards__list'>
          {props.cards.map((item) => (
            <Card key={item._id} card={item} onCardClick={props.onCardClick} onLikeClick={props.onLikeClick} onDeleteClick={props.onDeleteClick}/>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;