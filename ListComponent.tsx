import * as React from 'react';
const ListComponent = () => {
  const [list, setList] = React.useState<string[]>(['a', 'b', 'c']);
  const [value, setValue] = React.useState<string>();
  const onSubmit = (e) => {
    e.preventDefault();
    setList([value, ...list]);
    setValue('');
  };

  return (
    <div>
      <h2> ListComponent</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <ul>
        {list.map((e, index) => (
          <li key={index + 'lemg'}>{e}</li>
        ))}
      </ul>
    </div>
  );
};
export default ListComponent;
