import * as React from 'react';

const FormComponent = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [names, setNames] = React.useState<string[]>([]);
  const [valid, setIsVaid] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setIsVaid(true);
    setEmail('');
    setPassword('');
  };
  return (
    <div>
      <div>FormComponent</div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Submit</button>
      </form>
      {valid ? 'Login success' : ''}

      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'hide' : 'show'}
        </button>
      </form>
      <ul>
        {names.map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>
    </div>
  );
};
export default FormComponent;
