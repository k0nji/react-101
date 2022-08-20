import * as React from 'react';

const CountComponent = (props) => {
  const [num, setNum] = React.useState<number>(0);
  const increase = () => {
    props.onSetCount(props.count + 1);
  };

  React.useEffect(() => {
    if (props.count % 2 === 0) {
      setNum(props.count * 2);
    }
  }, [props.count]);

  return (
    <div>
      <div>num {num}</div>
      <div>Count: {props.count}</div>
      <button onClick={increase}>increase</button>
    </div>
  );
};

export default CountComponent;
