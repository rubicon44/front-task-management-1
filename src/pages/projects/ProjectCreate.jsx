import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postProject } from "src/infra/api";
import { PageHeader } from "src/components/Header/PageHeader";

export const ProjectCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { userId } = useParams();

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProjectData = {
      name,
      description,
      userId
    };
    try {
      await postProject(userId, newProjectData);
      navigate(`/users/${userId}/projects`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader title="プロジェクト作成" />
      <h2>プロジェクト作成</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:</label>
          <input type="text" value={name} onChange={handleNameChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange} required />
        </div>
        <button type="submit">作成</button>
      </form>
    </>
  );
};
