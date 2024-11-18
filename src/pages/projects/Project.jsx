import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
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
  const [loadingProject, setLoadingProject] = useState(true);
  const [errorProject, setErrorProject] = useState(null);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [errorTasks, setErrorTasks] = useState(null);

  const fetchProjectData = async () => {
    try {
      const jwt = Cookies.get('jwt');
      const response = await getProject(userId, projectId, jwt);
      const projectData = response.data;
      setProject(projectData);
    } catch (error) {
      setErrorProject(error);
    } finally {
      setLoadingProject(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const jwt = Cookies.get('jwt');
      const response = await getTasks(userId, projectId, jwt);
      const taskData = response.data;
      setTasks(taskData);
    } catch (error) {
      setErrorTasks(error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleDelete = async () => {
    setLoadingProject(true);
    try {
      const jwt = Cookies.get('jwt');
      await deleteProject(userId, projectId, jwt);
      navigate(`/users/${userId}/projects`);
    } catch (error) {
      setErrorProject(error);
    } finally {
      setLoadingProject(false);
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
      {loadingProject ? (
        <p>Loading project...</p>
      ) : errorProject ? (
        <p>Error: {errorProject.message}</p>
      ) : project ? (
        <div>
          <p>Project Name: {project.name}</p>
          <p>Description: {project.description}</p>
          <button onClick={() => navigate(`/users/${userId}/projects/${projectId}/edit`)}>編集</button>
          <button onClick={handleDelete}>削除</button>
          <button onClick={() => navigate(`/users/${userId}/projects/${projectId}/tasks/create`)}>タスク作成</button>

          <h3>タスク一覧</h3>
          {loadingTasks ? (
            <p>Loading tasks...</p>
          ) : errorTasks ? (
            <p>Error: {errorTasks.message}</p>
          ) : tasks.length > 0 ? (
            <ul>
              {tasks.map(task => (
                <li key={task.id}>
                  <p>Status: {getStatusLabel(task.status)}</p>
                  <p>

                  <Link to={`/users/${userId}/projects/${projectId}/tasks/${task.id}`}>
                    {task.title}
                  </Link>
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
