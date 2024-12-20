import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { getTask, updateTask } from "src/infra/api";
import { PageHeader } from 'src/components/Header/PageHeader';

export const TaskEdit = () => {
  const { userId, projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: "",
    content: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTaskData = async () => {
    try {
      const jwt = Cookies.get('jwt');
      const response = await getTask(userId, projectId, taskId, jwt);
      setTaskData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const jwt = Cookies.get('jwt');
      await updateTask(userId, projectId, taskId, taskData, jwt);
      navigate(`/users/${userId}/projects/${projectId}/tasks/${taskId}`);
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
      <PageHeader title="タスク編集" />
      <h2>タスク編集</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Task Title:</label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              name="content"
              value={taskData.content}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Status --</option>
              <option value="0">未対応</option>
              <option value="1">処理中</option>
              <option value="2">完了</option>
            </select>
          </div>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={taskData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={taskData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <input type="hidden" name="projectId" value={projectId} />
          <button type="submit">更新</button>
        </form>
      )}
    </div>
  );
};
