import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { getProject, updateProject } from "src/infra/api";
import { PageHeader } from 'src/components/Header/PageHeader';

export const ProjectEdit = () => {
  const { userId, projectId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjectData = async () => {
    try {
      const jwt = Cookies.get('jwt');
      const response = await getProject(userId, projectId, jwt);
      const projectData = response.data;
      setName(projectData.name);
      setDescription(projectData.description);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [userId, projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedProjectData = {
        name,
        description,
      };
      const jwt = Cookies.get('jwt');
      await updateProject(userId, projectId, updatedProjectData, jwt);
      navigate(`/users/${userId}/projects/${projectId}`);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="プロジェクト編集" />
      <h2>プロジェクト編集</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Project Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <button type="submit">更新</button>
        </form>
      )}
    </div>
  );
};
