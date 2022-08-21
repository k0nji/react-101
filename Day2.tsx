import * as React from 'react';

// topic
// - ref
// let count = 0;
// forwardRef
const Child = React.forwardRef<unknown, { label: string }>((props, ref) => {
  const inputRef = React.useRef<HTMLInputElement>();
  const inputRef2 = React.useRef<HTMLInputElement>();
  const inputFocusRef = React.useRef(0);
  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current.focus();
      },
      unfocus: () => {
        if (inputFocusRef.current === 2) {
          inputFocusRef.current = 1;
          inputRef.current.focus();
        } else {
          inputFocusRef.current = 2;
          inputRef2.current.focus();
        }
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
      <input type="text" ref={inputRef2} />
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
  const inputRefs = React.useRef<HTMLInputElement & { unfocus: () => void }>();
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
          }}
        >
          Focus
        </button>
        <button
          onClick={() => {
            inputRefs.current.unfocus();
          }}
        >
          unfocus
        </button>
      </div>
    </div>
  );
};
const UserContext = React.createContext(undefined);
const Child1 = (props) => {
  return (
    <div style={{ border: '1px solid red', padding: '8px' }}>
      <span>child 1</span>
      <Child2 name={props.name} />
    </div>
  );
};

const Child2 = (props) => {
  return (
    <div style={{ border: '1px solid red', padding: '8px' }}>
      <span>child 2</span>
      <Child3 name={props.name} />
    </div>
  );
};

const Child3 = (props) => {
  return (
    <div style={{ border: '1px solid red', padding: '8px' }}>
      <span>child 3</span>
      <Child4 name={props.name} />
    </div>
  );
};

const Child4 = (props) => {
  return (
    <div style={{ border: '1px solid red', padding: '8px' }}>
      <span>child 4</span>
      <Child5 name={props.name} />
    </div>
  );
};

const Child5 = (props) => {
  const userContext = React.useContext(UserContext);
  return (
    <div style={{ border: '1px solid red', padding: '8px' }}>
      <span>child 5</span>
      <p>{userContext.name}</p>
      <input
        type="text"
        value={userContext.name}
        onChange={(e) => userContext.setValue(e.target.value)}
      />
    </div>
  );
};

// this is my context
const MemoChild1 = React.memo(Child1);
const ContextExample = () => {
  const [name, setName] = React.useState<string>('');
  return (
    <div>
      <h3>ContextExample</h3>
      <ul>
        <li>create context</li>
        <li>define scope</li>
        <li>use context</li>
      </ul>
      <div>แม่!!</div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {name}
      <UserContext.Provider
        value={{
          name: name,
          setValue: setName,
        }}
      >
        <div>
          <MemoChild1 name="this is my name" />
        </div>
      </UserContext.Provider>
    </div>
  );
};
const Day2 = () => {
  const count = React.useRef(0);
  React.useEffect(() => {
    count.current += 1;
  }, []);

  const [value, setValue] = React.useState<string>('');
  // use call back
  const powFun = React.useCallback(() => {
    console.log('call back', value);
    return Math.pow(value.length, 2);
  }, [value]);

  return (
    <div>
      <h1> React 101 Day 2</h1>
      <hr />
      {/* <Ref /> */}
      {powFun()}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <ContextExample />
    </div>
  );
};
export default Day2;
