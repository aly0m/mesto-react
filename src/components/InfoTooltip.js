import signSuccess from '../images/signSuccess.png';
import signFail from '../images/signFail.png';

const InfoTooltip = (props) => {
  const className = `popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`;
  const textSuccess = 'Вы успешно зарегистрировались!';
  const textFail = 'Что-то пошло не так! Попробуйте ещё раз.';
  return (
    <section className={className}>
      <div className='tooltip popup__content'>
        <img className='tooltip__image' src={props.isRegistered ? signSuccess : signFail}/>
        <h3 className='tooltip__status popup__title'>
          {props.isRegistered ? textSuccess : textFail}
        </h3>
        <button className='popup__btn-close' type='button' onClick={props.onClose}/>
      </div>
    </section>
  )
}

export default InfoTooltip;