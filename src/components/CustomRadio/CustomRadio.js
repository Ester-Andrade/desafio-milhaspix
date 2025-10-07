import './styles.css';

const CustomRadio = ({
  id,
  name,
  labelValue,
  labelImg = '',
  style = {},
  imgStyle = {},
}) => {
  return (
    <label htmlFor={id} className='radio-label' style={style}>
      <input
        type='radio'
        id={id}
        name={name}
        value={labelValue}
        className='radio-input'
        required
      />
      <span>
        {labelImg === '' ? (
          labelValue
        ) : (
          <img
            src={labelImg}
            className='radio-label-img'
            style={imgStyle}
            alt=''
          />
        )}
      </span>
    </label>
  );
};

export default CustomRadio;
