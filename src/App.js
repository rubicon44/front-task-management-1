import 'src/styles/reset.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Auth
import { SignIn } from 'src/pages/auth/SignIn';
// Users
import { User } from 'src/pages/users/User';
import { UserCreate } from 'src/pages/users/UserCreate';
import { UserEdit } from 'src/pages/users/UserEdit';
// Layouts
import { PageLayout } from 'src/layouts/PageLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PageLayout />}>
          <Route
            path="/auth/signin"
            element={<SignIn />}
          />
          <Route
            path="/users/create"
            element={<UserCreate />}
          />
          <Route
            path="/users/:id"
            element={<User />}
          />
          <Route
            path="/users/:id/edit"
            element={<UserEdit />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;