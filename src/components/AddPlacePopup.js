import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = (props) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleLinkChange = (evt) => {
    setLink(evt.target.value)
  };

  const handleAddPlaceSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdatePlace({
      name: name,
      link: link
    });
    setName('');
    setLink('');
  };

  return (
    <PopupWithForm
      name='add-card'
      id='add-card-popup'
      isOpen={props.isOpen}
      title='Новое место'
      submitText='Сохранить'
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <div className='popup__form-field'>
        <input className='popup__input popup__input_type_name' name='input-card-name' id='card-name'
               type='text' placeholder='Название' minLength='2' maxLength='30' value={name || ''} onChange={handleNameChange} required/>
        <span className='popup__input-error popup__input-error_active' id='card-name-error'/>
      </div>
      <div className='popup__form-field'>
        <input className='popup__input popup__input_type_link' name='input-card-link' id='card-link'
               type='url' placeholder='Ссылка на картинку' value={link || ''} onChange={handleLinkChange} required/>
        <span className='popup__input-error popup__input-error_active' id='card-link-error'/>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;