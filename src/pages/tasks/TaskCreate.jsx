import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postTask } from "src/infra/api";
import { PageHeader } from 'src/components/Header/PageHeader';

export const TaskCreate = () => {
  const { userId, projectId } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: "",
    content: "",
    status: "",
    startDate: "",
    endDate: "",
    userId: userId,
    projectId: projectId,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postTask(userId, projectId, taskData);
      navigate(`/users/${userId}/projects/${projectId}`);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="タスク作成" />
      <h2>タスク作成</h2>
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
          <input type="hidden" name="projectId" value={taskData.projectId} />
          <button type="submit">作成</button>
        </form>
      )}
    </div>
  );
};
