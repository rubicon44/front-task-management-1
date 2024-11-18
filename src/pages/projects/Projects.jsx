import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { getProjects } from "src/infra/api";
import { PageHeader } from 'src/components/Header/PageHeader';

export const Projects = () => {
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      const jwt = Cookies.get('jwt');
      const response = await getProjects(userId, jwt);
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  return (
    <div>
      <PageHeader title="プロジェクト一覧" />
      <h2>プロジェクト一覧</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link to={`/users/${userId}/projects/${project.id}`}>
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>プロジェクトがありません。</p>
      )}
    </div>
  );
};
