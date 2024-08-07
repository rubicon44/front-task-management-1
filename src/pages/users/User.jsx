import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, deleteUser } from "src/infra/api";

export const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await getUser(id);
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
      await deleteUser(id);
      navigate("/");
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  return (
    <div>
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
          <button onClick={() => navigate(`/users/${id}/edit`)}>編集</button>
          <button onClick={handleDelete}>削除</button>
        </div>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

{/* <p>Username: テストユーザー</p>
<p>Nickname: テストニックネーム</p>
<p>Email: test@email.com</p> */}
