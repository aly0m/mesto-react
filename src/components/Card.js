const Card = (props) => {
  const handleCardClick = () => {
    props.onClick(props.cardData);
  };

  return (
    <li className='card'>
      <img className='card__image' src={props.cardData.link} alt={props.name} onClick={handleCardClick}/>
      <button className='card__btn-delete' type='button'/>
      <div className='card__container'>
        <h2 className='card__title'>{props.cardData.name}</h2>
        <div className='card__group-like'>
          <button className='card__btn-like' type='button'/>
          <span className='card__count-like'>{props.cardData.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;