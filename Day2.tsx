import * as React from 'react';
// topic
// - ref
// let count = 0;
// forwardRef
const Child = React.forwardRef<unknown, { label: string }>((props, ref) => {
  const inputRef = React.useRef<HTMLInputElement>();
  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        console.log('focus');
        inputRef.current.focus();
      },
      setValue: (value) => {
        console.log('set value');
        inputRef.current.value = value;
      },
      getValue: (): string => {
        return inputRef.current.value;
      },
    }),
    []
  );
  return (
    <div>
      {/* <label ref={ref}>{props.label}</label>; */}
      <input type="text" ref={inputRef} />
    </div>
  );
});
const Ref = () => {
  const [value, setValue] = React.useState<string>('');
  const count = React.useRef(0);
  const inputRef = React.useRef<HTMLInputElement>();
  const inputRef1 = React.useRef<HTMLInputElement>();
  const inputRef2 = React.useRef<HTMLInputElement>();

  const onFocus = () => {
    inputRef.current.focus();
  };

  const onchangeH = (e) => {
    if (e.target.value.length > 2) {
      inputRef2.current.focus();
    }
  };

  const onchangeF = (e) => {
    if (e.target.value.length === 0) {
      inputRef1.current.focus();
    }
  };
  const inputRefs = React.useRef<HTMLInputElement>();
  return (
    <div>
      <h3>Ref</h3>
      <ul>
        <li>track html element</li>
        <li>access DOM</li>
        <li>modify element atr</li>
        <li>React.useRef()</li>
        <li>use case</li>
        <li>focus field error (require/validdate)</li>
        <ul>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={() => onFocus()}>Focus</button>
          <div>count: {count.current}</div>
        </ul>
      </ul>
      <h3>โจทย์</h3>
      <div>
        <input type="text" ref={inputRef1} onChange={(e) => onchangeH(e)} />
        <input type="text" ref={inputRef2} onChange={(e) => onchangeF(e)} />
      </div>
      <h3></h3>
      <div>
        <Child ref={inputRefs} label="keng" />
        <button
          onClick={() => {
            inputRefs.current.focus();
            inputRefs.current.setValue('keng');
            console.log('get ref', inputRefs.current.getValue());
          }}
        >
          Focus
        </button>
      </div>
    </div>
  );
};

const Day2 = () => {
  const count = React.useRef(0);
  React.useEffect(() => {
    count.current += 1;
  }, []);

  return (
    <div>
      <h1> React 101 Day 2</h1>
      <hr />
      <Ref />
    </div>
  );
};
export default Day2;
