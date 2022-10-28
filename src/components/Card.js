import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Card = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `card__btn-delete ${isOwner ? '' : 'card__btn-delete_hidden'}`
  );
  const cardLikeButtonClassName = (
    `card__btn-like ${isLiked ? 'card__btn-like_active' : ''}`
  );

  const handleCardClick = () => {
    props.onCardClick(props.card);
  };
  
  const handleLikeClick = () => {
    props.onLikeClick(props.card);
  };

  const handleDeleteClick = () => {
    props.onDeleteClick(props.card);
  }

  return (
    <li className='card'>
      <img className='card__image' src={props.card.link} alt={props.card.name} onClick={handleCardClick}/>
      <button className={`${cardDeleteButtonClassName}`} type='button' onClick={handleDeleteClick}/>
      <div className='card__container'>
        <h2 className='card__title'>{props.card.name}</h2>
        <div className='card__group-like'>
          <button className={`${cardLikeButtonClassName}`} type='button' onClick={handleLikeClick}/>
          <span className='card__count-like'>{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;