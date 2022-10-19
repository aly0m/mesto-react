const ImagePopup = (props) => {
  const className= `popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`;
  return (
    <section className={className}>
      <div className="popup__content popup__content-image" method="POST">
        <img className="popup__image" src={props.card.link} alt={props.card.name}/>
        <p className="popup__caption">{props.card.name}</p>
        <button className="popup__btn-close" type="button" onClick={props.onClose}/>
      </div>
    </section>
  );
};

export default ImagePopup;