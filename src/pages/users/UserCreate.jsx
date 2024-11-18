import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { postUser } from 'src/infra/api';
import { PageHeader } from 'src/components/Header/PageHeader';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/infra/firebase';

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

  const postUserFunc = async (user, idToken) => {
    try {
      const response = await postUser(user, idToken);
      const jwt = response.token;
      const createdUserId = response.user.id;

      Cookies.set('jwt', jwt);
      Cookies.set('userId', createdUserId);

      navigateToUsers(`/users/${createdUserId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const newUser = {
        username: username,
        nickname: nickname,
        email: email,
        firebaseId: firebaseUser.uid,
      };

      const { currentUser } = auth;
      const idToken = await currentUser.getIdToken(/* forceRefresh */ true);

      await postUserFunc(newUser, idToken);
      setUsername('');
      setNickname('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log("Firebase user creation error:", error);
    }
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
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit">作成</button>
      </form>
    </>
  );
};
