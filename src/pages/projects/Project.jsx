import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProject, deleteProject } from "src/infra/api";
import { PageHeader } from 'src/components/Header/PageHeader';

export const Project = () => {
  const { userId, projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
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
        </div>
      ) : (
        <p>Project not found.</p>
      )}
    </div>
  );
};
