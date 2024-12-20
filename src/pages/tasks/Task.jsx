import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { getTask, deleteTask } from "src/infra/api";
import { PageHeader } from 'src/components/Header/PageHeader';

const getStatusLabel = (status) => {
  switch (status) {
    case 0:
      return '未対応';
    case 1:
      return '処理中';
    case 2:
      return '完了';
    default:
      return 'Unknown';
  }
};

export const Task = () => {
  const { userId, projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTaskData = async () => {
    try {
      const jwt = Cookies.get('jwt');
      const response = await getTask(userId, projectId, taskId, jwt);
      const taskData = response.data;
      setTask(taskData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const jwt = Cookies.get('jwt');
      await deleteTask(userId, projectId, taskId, jwt);
      navigate(`/users/${userId}/projects/${projectId}`);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, [userId, projectId, taskId]);

  return (
    <div>
      <PageHeader title={'タスク詳細'} />
      <h2>タスク詳細</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : task ? (
        <div>
          <p>Task Title: {task.title}</p>
          <p>Content: {task.content}</p>
          <p>Status: {getStatusLabel(task.status)}</p>
          <p>Start Date: {task.startDate}</p>
          <p>End Date: {task.endDate}</p>
          <button onClick={() => navigate(`/users/${userId}/projects/${projectId}/tasks/${taskId}/edit`)}>編集</button>
          <button onClick={handleDelete}>削除</button>
        </div>
      ) : (
        <p>Task not found.</p>
      )}
    </div>
  );
};
