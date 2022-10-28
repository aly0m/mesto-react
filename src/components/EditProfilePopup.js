import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, props.isOpen]);

  const handleChange = (evt) => {
    evt.target.name === 'input-profile-name' ? setName(evt.target.value) : setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdate({
      name,
      about: description
    });
  };

  return (
    <PopupWithForm
      name='edit-profile'
      id='edit-profile-popup'
      isOpen={props.isOpen}
      title='Редактировать профиль'
      submitText='Сохранить'
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className='popup__form-field'>
        <input className='popup__input popup__input_type_name' name='input-profile-name' id='profile-name'
               type='text' placeholder='Имя' minLength='2' maxLength='40' value={name} onChange={handleChange} required/>
        <span className='popup__input-error popup__input-error_active' id='profile-name-error'/>
      </div>
      <div className='popup__form-field'>
        <input className='popup__input popup__input_type_text' name='input-profile-description' id='profile-description'
               type='text' placeholder='Вид деятельности' minLength='2' maxLength='200' value={description} onChange={handleChange} required/>
        <span className='popup__input-error popup__input-error_active' id='profile-description-error'/>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;