import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProject, deleteProject, getTasks } from "src/infra/api";
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

export const Project = () => {
  const { userId, projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjectData = async () => {
    try {
      const response = await getProject(userId, projectId);
      const projectData = response.data;
      setProject(projectData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await getTasks(userId, projectId);
      const taskData = response.data;
      setTasks(taskData);
    } catch (error) {
      setError(error);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProject(userId, projectId);
      navigate(`/users/${userId}/projects`);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectData();
    fetchTasks();
  }, [userId, projectId]);

  return (
    <div>
      <PageHeader title={'プロジェクト詳細'} />
      <h2>プロジェクト詳細</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : project ? (
        <div>
          <p>Project Name: {project.name}</p>
          <p>Description: {project.description}</p>
          <button onClick={() => navigate(`/users/${userId}/projects/${projectId}/edit`)}>編集</button>
          <button onClick={handleDelete}>削除</button>
          <button onClick={() => navigate(`/users/${userId}/projects/${projectId}/tasks/create`)}>タスク作成</button>

          <h3>タスク一覧</h3>
          {tasks.length > 0 ? (
            <ul>
              {tasks.map(task => (
                <li key={task.id}>
                  <p>Status: {getStatusLabel(task.status)}</p>
                  <p>
                    <a href={`/users/${userId}/projects/${projectId}/tasks/${task.id}`}>
                      タイトル: {task.title}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>タスクはありません。</p>
          )}
        </div>
      ) : (
        <p>Project not found.</p>
      )}
    </div>
  );
};
