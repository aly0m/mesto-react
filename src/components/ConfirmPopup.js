import PopupWithForm from './PopupWithForm';

const ConfirmPopup = (props) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSubmit(props.card);
  };

  return (
    <PopupWithForm
      name='confirm'
      id='confirm-popup'
      title='Вы уверены?'
      isOpen={props.isOpen}
      submitText='Да'
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default ConfirmPopup;