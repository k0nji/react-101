import * as React from 'react';

const InputComponent = (props) => {
  const [value, setValue] = React.useState('init ');
  return (
    <div>
      <p>Label: {value}</p>{' '}
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
          props.onChangeInput(e.target.value);
        }}
        value={value}
      />
    </div>
  );
};
export default InputComponent;
