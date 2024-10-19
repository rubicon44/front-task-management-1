import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUser } from 'src/infra/api';
import { PageHeader } from 'src/components/Header/PageHeader';

export const UserCreate = () => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateToUsers = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const postUserFunc = async (user) => {
    try {
      await postUser(user);
      navigateToUsers("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      nickname: nickname,
      email: email,
      password: password,
    };

    await postUserFunc(newUser);

    setUsername('');
    setNickname('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <PageHeader title={'ユーザー作成'} />
      <h2>ユーザー作成</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} required />
        </div>
        <div>
          <label>Nickname:</label>
          <input type="text" value={nickname} onChange={handleNicknameChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="text" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit">作成</button>
      </form>
    </>
  );
};