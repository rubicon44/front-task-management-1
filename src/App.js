import 'src/styles/reset.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
// Hooks
import { useAuthRedirect } from 'src/hooks/useAuthRedirect';

const App = () => {
  const isLoggedIn = useAuthRedirect();

  if (isLoggedIn === null) {
    // ログイン状態の判定が終わるまでローディングを表示
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route element={<PageLayout />}>
          {/* サインイン */}
          <Route
            path="/auth/signin"
            element={<SignIn />}
          />
          {/* 会員登録 */}
          <Route
            path="/users/create"
            element={<UserCreate />}
          />
          {/* ユーザー関連 */}
          <Route
            path="/users/:userId"
            element={isLoggedIn ? <User /> : <Navigate to="/auth/signin" />}
          />
          <Route
            path="/users/:userId/edit"
            element={isLoggedIn ? <UserEdit /> : <Navigate to="/auth/signin" />}
          />
          {/* プロジェクト関連 */}
          <Route path="/users/:userId/projects" element={isLoggedIn ? <Projects /> : <Navigate to="/auth/signin" />} />
          <Route path="/users/:userId/projects/create" element={<ProjectCreate />} />
          <Route path="/users/:userId/projects/:projectId" element={isLoggedIn ? <Project /> : <Navigate to="/auth/signin" />} />
          <Route path="/users/:userId/projects/:projectId/edit" element={isLoggedIn ? <ProjectEdit /> : <Navigate to="/auth/signin" />} />
          {/* タスク関連 */}
          <Route path="/users/:userId/projects/:projectId/tasks/create" element={isLoggedIn ? <TaskCreate /> : <Navigate to="/auth/signin" />} />
          <Route path="/users/:userId/projects/:projectId/tasks/:taskId" element={isLoggedIn ? <Task /> : <Navigate to="/auth/signin" />} />
          <Route path="/users/:userId/projects/:projectId/tasks/:taskId/edit" element={isLoggedIn ? <TaskEdit /> : <Navigate to="/auth/signin" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
