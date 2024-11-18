import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { signIn } from 'src/infra/api';
import { PageHeader } from 'src/components/Header/PageHeader';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/infra/firebase';

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

  const signInFunc = async (user, idToken) => {
    try {
      const response = await signIn(user, idToken);
      const jwt = response.token;
      const userId = response.userId;

      Cookies.set('jwt', jwt)
      Cookies.set('userId', userId);

      navigateToUsers(`/users/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const { currentUser } = auth;
    const idToken = await currentUser.getIdToken(/* forceRefresh */ true);

    const user = {
      email: firebaseUser.email,
      firebaseId: firebaseUser.uid,
    };

    await signInFunc(user, idToken);

    setEmail('');
    setPassword('');
  };

  return (
    <>
      <PageHeader title="ログイン" />
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