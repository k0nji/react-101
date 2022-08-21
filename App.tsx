import * as React from 'react';
import './style.css';
import InputComponent from './InputComponent';
import CountComponent from './CountComponent';
import ListComponent from './ListComponent';
import FormComponent from './FormComponent';

const IKENG = () => <div>IKENG</div>;
const list = [1, 2, 3, 4, '121', true];

class App2 extends React.Component {
  render() {
    return (
      <div style={{ border: '1px solid red' }}>
        APP <IKENG />
      </div>
    );
  }
}

// memo
const Header1 = React.memo((props) => (
  <div style={{ color: props.color || 'red', fondSize: '16px' }}>
    {props.title}
  </div>
));

export default function App() {
  const [name] = React.useState<string>('HELLO WORLD');
  const [count, setCount] = React.useState<number>(0);
  const [title, setTitle] = React.useState<string>('Header 1');
  const [showHeader, setShowHeader] = React.useState<boolean>(false);

  const onChangeInput = (t: string) => {
    setTitle(t);
  };

  const onSetCount = (c: number) => {
    setCount(c);
  };
  React.useEffect(() => {
    if (count >= 0 && count <= 5 && title === 'show') {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  }, [title]);

  if (title === 'Hello React 101') {
    return <div>Hello React 101</div>;
  }
  // count >= 0 && count <=5 && title === 'show'
  // set show = true
  // elase set show false
  // watch title

  return (
    <div style={{ border: '1px solid red', padding: '10px' }}>
      <IKENG />
      <App2 />
      <h1>{name}</h1>
      {showHeader && <Header1 title={title} />}
      <Header1 title={`Header ${count}`} color="blue" />
      <InputComponent onChangeInput={onChangeInput} />

      {/* operaction rendering */}
      {count % 2 === 0 ? <div>Even {count}</div> : <div>Odd {count}</div>}

      <CountComponent onSetCount={onSetCount} count={count} />
      <ListComponent />
      <br />
      <FormComponent />
    </div>
  );
}
