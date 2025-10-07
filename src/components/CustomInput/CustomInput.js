import './styles.css';

const CustomInput = ({
  id,
  name,
  type = 'text',
  placeholder = '',
  icon = '',
  style = {},
  fontconfig = {},
  disable = false,
  required = false,
  children,
  onBlur = () => {},
}) => {
  return (
    <div className='input-div' style={style}>
      {children !== '' && children}
      {required ? (
        <input
          className='input-field'
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          disabled={disable}
          style={fontconfig}
          required
          onBlur={onBlur}
        />
      ) : (
        <input
          className='input-field'
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          disabled={disable}
          style={fontconfig}
        />
      )}
      {icon !== '' && <img src={icon} className='input-icon' alt='' />}
    </div>
  );
};

export default CustomInput;
