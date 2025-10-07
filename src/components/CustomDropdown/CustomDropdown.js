import './styles.css';

const CustomDropdown = ({ id, name, data, style = {}, fontconfig = {} }) => {
  return (
    <select
      id={id}
      name={name}
      className='custom-select'
      style={{ ...style, ...fontconfig }}
    >
      <button>
        <selectedcontent></selectedcontent>
      </button>
      {data.map((value, key) => (
        <option key={key} value={key} style={fontconfig}>
          <span className='option-label'>{value}</span>
        </option>
      ))}
    </select>
  );
};

export default CustomDropdown;
