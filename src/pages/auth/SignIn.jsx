import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from 'src/infra/api';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateToUsers = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signInFunc = async (user) => {
    try {
      await signIn(user);
      navigateToUsers("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signInUser = {
      email: email,
      password: password,
    };

    await signInFunc(signInUser);

    setEmail('');
    setPassword('');
  };

  return (
    <>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="text" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </>
  );
};