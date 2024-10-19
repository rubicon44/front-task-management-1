import 'src/styles/reset.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Auth
import { SignIn } from 'src/pages/auth/SignIn';
// Users
import { User } from 'src/pages/users/User';
import { UserCreate } from 'src/pages/users/UserCreate';
import { UserEdit } from 'src/pages/users/UserEdit';
// Projects
import { Projects } from 'src/pages/projects/Projects';
import { Project } from 'src/pages/projects/Project';
import { ProjectCreate } from 'src/pages/projects/ProjectCreate';
import { ProjectEdit } from 'src/pages/projects/ProjectEdit';
// Tasks
import { Task } from 'src/pages/tasks/Task';
import { TaskCreate } from 'src/pages/tasks/TaskCreate';
import { TaskEdit } from 'src/pages/tasks/TaskEdit';
// Layouts
import { PageLayout } from 'src/layouts/PageLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PageLayout />}>
          <Route
            path="/users/:userId"
            element={<User />}
          />
          <Route
            path="/auth/signin"
            element={<SignIn />}
          />
          <Route
            path="/users/create"
            element={<UserCreate />}
          />
          <Route
            path="/users/:userId"
            element={<User />}
          />
          <Route
            path="/users/:userId/edit"
            element={<UserEdit />}
          />
          {/* Projects Routes */}
          <Route path="/users/:userId/projects" element={<Projects />} />
          <Route path="/users/:userId/projects/create" element={<ProjectCreate />} />
          <Route path="/users/:userId/projects/:projectId" element={<Project />} />
          <Route path="/users/:userId/projects/:projectId/edit" element={<ProjectEdit />} />

          {/* Tasks Routes */}
          <Route path="/users/:userId/projects/:projectId/tasks/create" element={<TaskCreate />} />
          <Route path="/users/:userId/projects/:projectId/tasks/:taskId" element={<Task />} />
          <Route path="/users/:userId/projects/:projectId/tasks/:taskId/edit" element={<TaskEdit />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;