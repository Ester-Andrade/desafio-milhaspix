import './styles.css';

const CustomButton = ({
  onPress,
  title,
  icon,
  UItype,
  direction = 'normal',
  type = 'button',
  style = {},
  form = '',
}) => {
  return form === '' ? (
    <button
      onClick={onPress}
      className={UItype + ' button'}
      type={type}
      style={style}
    >
      <span className={'button-content-' + direction}>
        <img src={icon} className='icon' alt='' />
        <span>{title}</span>
      </span>
    </button>
  ) : (
    <button
      form={form}
      onClick={onPress}
      className={UItype + ' button'}
      type={type}
      style={style}
    >
      <span className={'button-content-' + direction}>
        <img src={icon} className='icon' alt='' />
        <span>{title}</span>
      </span>
    </button>
  );
};

export default CustomButton;
