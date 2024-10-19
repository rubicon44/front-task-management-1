import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser } from 'src/infra/api';

export const UserEdit = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await getUser(userId);
      const userData = response.data;
      setUsername(userData.username);
      setNickname(userData.nickname);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedUserData = {
        username,
        nickname,
      };

      await updateUser(userId, updatedUserData);
      navigate(`/users/${userId}`);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>ユーザー編集</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label>Nickname:</label>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
          </div>
          <button type="submit">更新</button>
        </form>
      )}
    </div>
  );
};