import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { getUser, deleteUser } from "src/infra/api";
import { PageHeader } from 'src/components/Header/PageHeader';

export const User = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const jwt = Cookies.get('jwt');
      const response = await getUser(userId, jwt);
      const userData = response.data;
      setUser(userData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(userId);
      navigate("/");
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <div>
      <PageHeader title="ユーザー詳細" />
      <h2>ユーザー詳細</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
        ) : user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Nickname: {user.nickname}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => navigate(`/users/${userId}/edit`)}>編集</button>
          <button onClick={handleDelete}>削除</button>
        </div>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};
