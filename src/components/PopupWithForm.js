const PopupWithForm = (props) => {
  const className = `popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`;
  return (
    <section className={className}>
      <fieldset className='popup__content'>
        <h2 className='popup__title'>{props.title}</h2>
        <form className='popup__form' name={props.name} onSubmit={props.onSubmit} method="POST">
          {props.children}
          <button className='popup__btn-submit' name={props.name} type='submit'>
            {props.submitText}
          </button>
        </form>
        <button className='popup__btn-close' type='button' onClick={props.onClose}/>
      </fieldset>
    </section>
  );
};

export default PopupWithForm;