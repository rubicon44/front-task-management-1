import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTask, deleteTask } from "src/infra/api";
import { PageHeader } from 'src/components/Header/PageHeader';

export const Task = () => {
  const { userId, projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTaskData = async () => {
    try {
      const response = await getTask(userId, projectId, taskId);
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
      await deleteTask(userId, projectId, taskId);
      navigate("/tasks");
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
          <p>Status: {task.status}</p>
          <p>Start Date: {task.startDate}</p>
          <p>End Date: {task.endDate}</p>
          <button onClick={() => navigate(`/tasks/${taskId}/edit`)}>編集</button>
          <button onClick={handleDelete}>削除</button>
        </div>
      ) : (
        <p>Task not found.</p>
      )}
    </div>
  );
};
