import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
  const avatarRef = useRef('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onEditAvatar({
      link: avatarRef.current.value,
    })
  };

  return (
    <PopupWithForm
      name='edit-avatar'
      id='edit-avatar-popup'
      isOpen={props.isOpen}
      title='Обновить аватар'
      submitText='Сохранить'
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className='popup__form-field'>
        <input className='popup__input popup__input_type_link' name='input-avatar' id='avatar-url'
               type='url' placeholder='Ссылка на картинку' ref={avatarRef} required/>
        <span className='popup__input-error popup__input-error_active' id='avatar-url-error'/>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;