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

// CustomerHook
const useCounter = () => {
  const [count, setCount] = React.useState(0);

  const increase = (): void => {
    setCount((c) => c + 1);
  };

  const decrease = (): void => {
    setCount((c) => c - 1);
  };

  const setValue = (num: number) => {
    setCount(num);
  };
  return [count, increase, decrease, setValue];
};

const useRevese = () => {
  const revese = (str: string) => {
    return str.split('').reverse().join('');
  };

  return [revese];
};

const useQueryParam = () => {
  // q=scope&sxsrf=A
  const getAllParam = (str: string): { name: string; value: string }[] => {
    return str.split('&').map((e) => {
      const [name, value] = e.split('=');
      return { name, value };
    });
  };
  return [getAllParam];
};

const CustomerHook = () => {
  const [count, increase, decrease, setValue] = useCounter();
  const [revese] = useRevese();
  const [str, setStr] = React.useState<string>('');
  const [strQ, setStrQ] = React.useState<string>('');
  const [getAllParam] = useQueryParam();
  return (
    <div>
      <h3>Customer Hook</h3>
      <ul>
        <li>prefix with 'use'</li>
      </ul>
      <h3>example</h3>
      <div>
        <span>useCounter</span>
        <button onClick={() => increase()}>increase</button>
        <button onClick={() => decrease()}>decrease</button>
        <button onClick={() => setValue(Math.random())}>setValue</button>
        <div>count: {count}</div>
      </div>
      <h3>My Hook</h3>
      <div>
        <input
          type="text"
          value={str}
          onChange={(e) => setStr(e.target.value)}
        />
        <div>original:</div>
        <div>reverse: {revese(str)}</div>
        <hr />
        <label htmlFor="">My query string</label>
        <input
          type="text"
          value={strQ}
          onChange={(e) => setStrQ(e.target.value)}
        />
        <div>result</div>
        {getAllParam(strQ).map(({ name, value }) => {
          return (
            <div>
              name: {name} <br /> value: {value}
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Parent = (prop) => {
  const [value, setValue] = React.useState<string>('');
  const [list] = React.useState<string[]>([
    'word',
    'dog',
    'cat',
    'fish',
    'react',
  ]);
  const [result, setResult] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (!value) {
      setResult([]);
      return;
    }
    const _result = list.filter((e) => e.includes(value));
    setResult(_result);
  }, [value]);

  return (
    <div style={{ border: '1px solid red', padding: '18px' }}>
      <h4>In parent</h4>
      <div>Title {prop.title}</div>
      <label htmlFor="keyword">🪅</label>
      <input
        name="keyword"
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {prop.children(result)}
    </div>
  );
};

const Children = () => {
  return (
    <div>
      <h3>Children...</h3>
      <Parent title="this is 1">
        {(props) => {
          return (
            <React.Fragment>
              {!props.length && <p>result not found</p>}
              <ul>
                {props.map((e, i) => {
                  return <li key={i}>{e}</li>;
                })}
              </ul>
            </React.Fragment>
          );
        }}
      </Parent>
      <br />
    </div>
  );
};

const MyBook = () => {
  return (
    <div>
      <h3>my book</h3>
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
      {/* <hr /> */}
      {/* <ContextExample /> */}
      {/* <hr /> */}
      {/* {powFun()}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      /> */}
      {/* <hr /> */}
      {/* <CustomerHook /> */}
      {/* <hr /> */}
      <Children />
    </div>
  );
};
export default Day2;
